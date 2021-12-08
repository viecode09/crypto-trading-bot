const c = (module.exports = {});

c.symbols = [
  {
    symbol: 'SANDUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
          }
        }
      ]
    },
    watchdogs: [
      {
        name: 'risk_reward_ratio',
        target_percent: 2.5,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'MANAUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
          }
        }
      ]
    },
    watchdogs: [
      {
        name: 'risk_reward_ratio',
        target_percent: 2.5,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'ADAUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
          }
        }
      ]
    },
    watchdogs: [
      {
        name: 'risk_reward_ratio',
        target_percent: 2.5,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'XLMUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
          }
        }
      ]
    },
    watchdogs: [
      {
        name: 'risk_reward_ratio',
        target_percent: 2.5,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'GALAUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
          }
        }
      ]
    },
    watchdogs: [
      {
        name: 'risk_reward_ratio',
        target_percent: 2.5,
        stop_percent: 5.1
      }
    ]
  },
  {
    symbol: 'DOTUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      capital: 4,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      currency_capital: 200,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      capital: 4,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
    periods: ['3m', '5m', '15m'],
    trade: {
      capital: 4,
      strategies: [
        {
          strategy: 'dip_catcher',
          interval: '5m',
          options: {
            period: '5m'
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
