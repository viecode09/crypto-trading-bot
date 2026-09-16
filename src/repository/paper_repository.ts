import type { PaperAccount, PaperPosition, PaperTrade } from '../paper/types';

export interface Database {
  prepare(sql: string): Statement;
}

export interface Statement {
  get(parameters?: any): any;
  all(parameters?: any): any[];
  run(parameters?: any): void;
}

export class PaperRepository {
  constructor(private db: Database) {}

  getAccount(profileId: string): PaperAccount | undefined {
    const row = this.db.prepare('SELECT * FROM paper_accounts WHERE profile_id = $profile_id').get({ profile_id: profileId });
    if (!row) {
      return undefined;
    }
    return {
      profileId: row.profile_id,
      exchange: row.exchange,
      quoteCurrency: row.quote_currency,
      initialBalance: row.initial_balance,
      cash: row.cash,
      createdAt: row.created_at
    };
  }

  saveAccount(account: PaperAccount): void {
    this.db
      .prepare(
        'INSERT INTO paper_accounts(profile_id, exchange, quote_currency, initial_balance, cash, created_at) ' +
          'VALUES ($profile_id, $exchange, $quote_currency, $initial_balance, $cash, $created_at) ' +
          'ON CONFLICT(profile_id) DO UPDATE SET exchange=$exchange, quote_currency=$quote_currency, cash=$cash'
      )
      .run({
        profile_id: account.profileId,
        exchange: account.exchange,
        quote_currency: account.quoteCurrency,
        initial_balance: account.initialBalance,
        cash: account.cash,
        created_at: account.createdAt
      });
  }

  setCash(profileId: string, cash: number): void {
    this.db.prepare('UPDATE paper_accounts SET cash = $cash WHERE profile_id = $profile_id').run({ profile_id: profileId, cash });
  }

  getOpenPositions(profileId: string): PaperPosition[] {
    const rows = this.db.prepare('SELECT * FROM paper_positions WHERE profile_id = $profile_id').all({ profile_id: profileId });
    return rows.map((row: any) => ({
      profileId: row.profile_id,
      pair: row.pair,
      side: row.side,
      amount: row.amount,
      entryPrice: row.entry_price,
      openedAt: row.opened_at
    }));
  }

  getPosition(profileId: string, pair: string): PaperPosition | undefined {
    const row = this.db
      .prepare('SELECT * FROM paper_positions WHERE profile_id = $profile_id AND pair = $pair')
      .get({ profile_id: profileId, pair });
    if (!row) {
      return undefined;
    }
    return {
      profileId: row.profile_id,
      pair: row.pair,
      side: row.side,
      amount: row.amount,
      entryPrice: row.entry_price,
      openedAt: row.opened_at
    };
  }

  upsertPosition(position: PaperPosition): void {
    this.db
      .prepare(
        'INSERT INTO paper_positions(profile_id, pair, side, amount, entry_price, opened_at) ' +
          'VALUES ($profile_id, $pair, $side, $amount, $entry_price, $opened_at) ' +
          'ON CONFLICT(profile_id, pair) DO UPDATE SET side=$side, amount=$amount, entry_price=$entry_price, opened_at=$opened_at'
      )
      .run({
        profile_id: position.profileId,
        pair: position.pair,
        side: position.side,
        amount: position.amount,
        entry_price: position.entryPrice,
        opened_at: position.openedAt
      });
  }

  deletePosition(profileId: string, pair: string): void {
    this.db.prepare('DELETE FROM paper_positions WHERE profile_id = $profile_id AND pair = $pair').run({ profile_id: profileId, pair });
  }

  insertTrade(trade: PaperTrade): void {
    this.db
      .prepare(
        'INSERT INTO paper_trades(profile_id, pair, side, amount, price, quote_amount, pnl, created_at) ' +
          'VALUES ($profile_id, $pair, $side, $amount, $price, $quote_amount, $pnl, $created_at)'
      )
      .run({
        profile_id: trade.profileId,
        pair: trade.pair,
        side: trade.side,
        amount: trade.amount,
        price: trade.price,
        quote_amount: trade.quoteAmount,
        pnl: trade.pnl,
        created_at: trade.createdAt
      });
  }

  getTrades(profileId: string, limit: number = 50): PaperTrade[] {
    const rows = this.db
      .prepare('SELECT * FROM paper_trades WHERE profile_id = $profile_id ORDER BY created_at DESC, id DESC LIMIT $limit')
      .all({ profile_id: profileId, limit });
    return rows.map((row: any) => ({
      id: row.id,
      profileId: row.profile_id,
      pair: row.pair,
      side: row.side,
      amount: row.amount,
      price: row.price,
      quoteAmount: row.quote_amount,
      pnl: row.pnl,
      createdAt: row.created_at
    }));
  }

  getRealizedPnl(profileId: string): number {
    const row = this.db.prepare('SELECT COALESCE(SUM(pnl), 0) AS total FROM paper_trades WHERE profile_id = $profile_id').get({ profile_id: profileId });
    return row?.total ?? 0;
  }

  clearTrades(profileId: string): void {
    this.db.prepare('DELETE FROM paper_trades WHERE profile_id = $profile_id').run({ profile_id: profileId });
  }
}
