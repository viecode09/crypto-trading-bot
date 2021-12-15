const c = (module.exports = {});

c.symbols = [
  {
    symbol: 'SANDUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'ADAUSDT',
    exchange: 'binance_futures',
    periods: ['3m','15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'DOTUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'BNBUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      capital: 4,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'MATICUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'ALICEUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'AXSUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      capital: 4,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'SOLUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      capital: 4,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'AVAXUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'XRPUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 500,
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
        target_percent: 3.0,
        stop_percent: 10.0
      }
    ]
  }
];
