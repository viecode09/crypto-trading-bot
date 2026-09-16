import type { Logger } from '../modules/services';
import type { ProfileService } from '../profile/profile_service';
import { PaperRepository } from '../repository/paper_repository';
import type { PaperAccount, PaperAccountView, PaperPosition, PaperPositionView, PaperSignal, PaperTrade } from './types';

const DEFAULT_BALANCE = 1000;
const DEFAULT_QUOTE_CURRENCY = 'USDT';

export class PaperTradingService {
  constructor(
    private readonly repository: PaperRepository,
    private readonly profileService: ProfileService,
    private readonly logger: Logger
  ) {}

  getOrCreateAccount(profileId: string, exchange: string, initialBalance?: number): PaperAccount {
    const existing = this.repository.getAccount(profileId);
    if (existing) {
      return existing;
    }

    const account: PaperAccount = {
      profileId,
      exchange,
      quoteCurrency: DEFAULT_QUOTE_CURRENCY,
      initialBalance: initialBalance && initialBalance > 0 ? initialBalance : DEFAULT_BALANCE,
      cash: initialBalance && initialBalance > 0 ? initialBalance : DEFAULT_BALANCE,
      createdAt: Math.floor(Date.now() / 1000)
    };

    this.repository.saveAccount(account);
    return account;
  }

  resetAccount(profileId: string, exchange: string, initialBalance?: number): PaperAccount {
    const balance = initialBalance && initialBalance > 0 ? initialBalance : DEFAULT_BALANCE;
    const account: PaperAccount = {
      profileId,
      exchange,
      quoteCurrency: DEFAULT_QUOTE_CURRENCY,
      initialBalance: balance,
      cash: balance,
      createdAt: Math.floor(Date.now() / 1000)
    };

    this.repository.saveAccount(account);
    this.repository.clearTrades(profileId);
    for (const position of this.repository.getOpenPositions(profileId)) {
      this.repository.deletePosition(profileId, position.pair);
    }

    return account;
  }

  /**
   * Simulates a market order for the given signal, mirroring the live BotRunner
   * semantics: long spends `capital` quote on the base currency, short opens a
   * synthetic short of `capital`, close settles the open position at `price`.
   */
  executeSignal(
    profileId: string,
    exchange: string,
    pair: string,
    signal: PaperSignal,
    capital: number,
    price: number,
    initialBalance?: number
  ): PaperTrade | undefined {
    if (!price || price <= 0) {
      this.logger.warn(`Paper: invalid price for ${exchange}:${pair}, skipping ${signal}`);
      return undefined;
    }

    const account = this.getOrCreateAccount(profileId, exchange, initialBalance);
    const openPosition = this.repository.getPosition(profileId, pair);

    switch (signal) {
      case 'long':
        return this.openLong(account, pair, capital, price, openPosition);
      case 'short':
        return this.openShort(account, pair, capital, price, openPosition);
      case 'close':
        return this.closePosition(account, pair, price, openPosition);
      default:
        return undefined;
    }
  }

  private openLong(account: PaperAccount, pair: string, capital: number, price: number, openPosition?: PaperPosition): PaperTrade | undefined {
    if (openPosition) {
      return undefined;
    }

    const notional = Math.min(capital, account.cash);
    if (notional <= 0) {
      this.logger.warn(`Paper: insufficient balance (${account.cash}) for long ${pair}`);
      return undefined;
    }

    const amount = notional / price;

    this.repository.upsertPosition({
      profileId: account.profileId,
      pair,
      side: 'long',
      amount,
      entryPrice: price,
      openedAt: Math.floor(Date.now() / 1000)
    });
    this.repository.setCash(account.profileId, account.cash - notional);

    return this.record(account.profileId, pair, 'buy', amount, price, notional, 0);
  }

  private openShort(account: PaperAccount, pair: string, capital: number, price: number, openPosition?: PaperPosition): PaperTrade | undefined {
    if (openPosition) {
      return undefined;
    }

    if (capital <= 0) {
      return undefined;
    }

    const amount = capital / price;

    this.repository.upsertPosition({
      profileId: account.profileId,
      pair,
      side: 'short',
      amount,
      entryPrice: price,
      openedAt: Math.floor(Date.now() / 1000)
    });

    return this.record(account.profileId, pair, 'sell', amount, price, capital, 0);
  }

  private closePosition(account: PaperAccount, pair: string, price: number, openPosition?: PaperPosition): PaperTrade | undefined {
    if (!openPosition) {
      return undefined;
    }

    let pnl: number;
    let cashDelta: number;
    let side: 'buy' | 'sell';

    if (openPosition.side === 'long') {
      const proceeds = openPosition.amount * price;
      pnl = (price - openPosition.entryPrice) * openPosition.amount;
      cashDelta = proceeds;
      side = 'sell';
    } else {
      pnl = (openPosition.entryPrice - price) * openPosition.amount;
      cashDelta = pnl;
      side = 'buy';
    }

    this.repository.setCash(account.profileId, account.cash + cashDelta);
    this.repository.deletePosition(account.profileId, pair);

    return this.record(account.profileId, pair, side, openPosition.amount, price, openPosition.amount * price, pnl);
  }

  private record(
    profileId: string,
    pair: string,
    side: 'buy' | 'sell',
    amount: number,
    price: number,
    quoteAmount: number,
    pnl: number
  ): PaperTrade {
    const trade: PaperTrade = {
      profileId,
      pair,
      side,
      amount,
      price,
      quoteAmount,
      pnl,
      createdAt: Math.floor(Date.now() / 1000)
    };

    this.repository.insertTrade(trade);
    return trade;
  }

  async getAccountView(profileId: string, exchange: string, initialBalance?: number): Promise<PaperAccountView> {
    const account = this.getOrCreateAccount(profileId, exchange, initialBalance);
    const positions = this.repository.getOpenPositions(profileId);

    const positionViews: PaperPositionView[] = [];
    let unrealizedPnl = 0;

    for (const position of positions) {
      const markPrice = await this.getMarkPrice(exchange, position.pair, position.entryPrice);
      const positionPnl =
        position.side === 'long' ? (markPrice - position.entryPrice) * position.amount : (position.entryPrice - markPrice) * position.amount;
      const notional = position.amount * position.entryPrice;

      unrealizedPnl += positionPnl;

      positionViews.push({
        ...position,
        markPrice,
        unrealizedPnl: positionPnl,
        unrealizedPnlPercent: notional > 0 ? (positionPnl / notional) * 100 : 0
      });
    }

    const equity = account.cash + this.markToMarketValue(positionViews);
    const realizedPnl = this.repository.getRealizedPnl(profileId);

    return {
      account,
      positions: positionViews,
      equity,
      unrealizedPnl,
      realizedPnl,
      returnPercent: account.initialBalance > 0 ? ((equity - account.initialBalance) / account.initialBalance) * 100 : 0,
      trades: this.repository.getTrades(profileId)
    };
  }

  /**
   * Equity contribution of open positions. Longs are held as base currency
   * (cash was already deducted on entry), shorts contribute only their PnL.
   */
  private markToMarketValue(positions: PaperPositionView[]): number {
    return positions.reduce((sum, position) => {
      if (position.side === 'long') {
        return sum + position.amount * position.markPrice;
      }
      return sum + position.unrealizedPnl;
    }, 0);
  }

  private async getMarkPrice(exchange: string, pair: string, fallback: number): Promise<number> {
    try {
      const ticker = await this.profileService.fetchTickerPublic(exchange, pair);
      return ticker.last ?? ((ticker.bid + ticker.ask) / 2 || fallback);
    } catch (e: any) {
      this.logger.warn(`Paper: failed to fetch mark price for ${exchange}:${pair}: ${e.message || String(e)}`);
      return fallback;
    }
  }
}
