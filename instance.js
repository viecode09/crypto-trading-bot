const c = (module.exports = {});

c.symbols = [
  {
    symbol: 'SANDUSDT',
    exchange: 'binance_futures',
    extra: {
        binance_leverage: 20
    },
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 5,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '15m',
          options: {
            period: '15m'
          }
        }
      ]
    },
    watchdogs: [
      {
        name: 'risk_reward_ratio',
        target_percent: 3.1,
        stop_percent: 2.1
      }
    ]
  }
];
