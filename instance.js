const c = (module.exports = {});

c.symbols = [
  {
    symbol: 'SANDUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'MANAUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'ADAUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'XLMUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'GALAUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'DOTUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'BNBUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      capital: 1,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'MATICUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'ALICEUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'DYDXUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'SUSHIUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      currency_capital: 100,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'AXSUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      capital: 2,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'SOLUSDT',
    exchange: 'binance_futures',
    periods: ['1m', '15m', '1h'],
    trade: {
      capital: 2,
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
        target_percent: 2.8,
        stop_percent: 5.1
      }
    ]
  }

];
