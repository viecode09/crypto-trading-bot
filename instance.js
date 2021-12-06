const c = (module.exports = {});

c.symbols = [
  {
    symbol: 'ADAUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 2,
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

  },
  {
    symbol: 'MATICUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 2,
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

  },
 {
    symbol: 'MANAUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 2,
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
