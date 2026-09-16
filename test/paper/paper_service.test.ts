import assert from 'assert';
import Sqlite from 'better-sqlite3';
import { DATABASE_SCHEMA } from '../../src/utils/database_schema';
import { PaperRepository } from '../../src/repository/paper_repository';
import { PaperTradingService } from '../../src/paper/paper_service';

interface FakeTicker {
  bid: number;
  ask: number;
  last: number;
}

function createService(price = 100) {
  const db = new Sqlite(':memory:');
  db.exec(DATABASE_SCHEMA);

  let currentPrice = price;

  const profileService: any = {
    fetchTickerPublic: async (): Promise<FakeTicker> => ({
      bid: currentPrice - 0.1,
      ask: currentPrice + 0.1,
      last: currentPrice
    })
  };

  const logger: any = {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {}
  };

  const repository = new PaperRepository(db);
  const service = new PaperTradingService(repository, profileService, logger);

  return {
    service,
    repository,
    setPrice: (value: number) => {
      currentPrice = value;
    }
  };
}

describe('#paper trading', () => {
  it('opens a long position and deducts cash', () => {
    const { service, repository } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 100, 100, 1000);

    const account = repository.getAccount('p1');
    const position = repository.getPosition('p1', 'BTC/USDT');

    assert.equal(account!.cash, 900);
    assert.equal(position!.side, 'long');
    assert.equal(position!.amount, 1);
    assert.equal(position!.entryPrice, 100);
  });

  it('ignores a second long while a position is open', () => {
    const { service, repository } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 100, 100, 1000);
    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 100, 100, 1000);

    assert.equal(repository.getAccount('p1')!.cash, 900);
    assert.equal(repository.getTrades('p1').length, 1);
  });

  it('closes a long position and realizes profit', () => {
    const { service, repository } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 100, 100, 1000);
    const trade = service.executeSignal('p1', 'binance', 'BTC/USDT', 'close', 100, 110, 1000);

    assert.equal(trade!.pnl, 10);
    assert.equal(repository.getAccount('p1')!.cash, 1010);
    assert.equal(repository.getPosition('p1', 'BTC/USDT'), undefined);
    assert.equal(repository.getRealizedPnl('p1'), 10);
  });

  it('does not exceed available cash for a long', () => {
    const { service, repository } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 5000, 100, 250);

    assert.equal(repository.getAccount('p1')!.cash, 0);
    assert.equal(repository.getPosition('p1', 'BTC/USDT')!.amount, 2.5);
  });

  it('opens and closes a short position', () => {
    const { service, repository } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'short', 100, 100, 1000);
    const position = repository.getPosition('p1', 'BTC/USDT');
    assert.equal(position!.side, 'short');
    assert.equal(repository.getAccount('p1')!.cash, 1000);

    const trade = service.executeSignal('p1', 'binance', 'BTC/USDT', 'close', 100, 90, 1000);
    assert.equal(trade!.pnl, 10);
    assert.equal(repository.getAccount('p1')!.cash, 1010);
  });

  it('marks the account to market for equity and return', async () => {
    const { service, setPrice } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 100, 100, 1000);
    setPrice(120);

    const view = await service.getAccountView('p1', 'binance', 1000);

    assert.equal(view.positions.length, 1);
    assert.equal(view.unrealizedPnl, 20);
    assert.equal(view.equity, 1020);
    assert.equal(view.returnPercent, 2);
  });

  it('resets an account and clears history', () => {
    const { service, repository } = createService();

    service.executeSignal('p1', 'binance', 'BTC/USDT', 'long', 100, 100, 1000);
    service.resetAccount('p1', 'binance', 500);

    assert.equal(repository.getAccount('p1')!.cash, 500);
    assert.equal(repository.getOpenPositions('p1').length, 0);
    assert.equal(repository.getTrades('p1').length, 0);
  });
});
