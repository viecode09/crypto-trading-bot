const c = (module.exports = {});

c.symbols = [
  {
    symbol: 'BTCUSDT',
    exchange: 'binance_futures',
    periods: ['5m', '15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'ETHUSDT',
    exchange: 'binance_futures',
    periods: ['5m', '15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'BNBUSDT',
    exchange: 'binance_futures',
    periods: ['5m','15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'SOLUSDT',
    exchange: 'binance_futures',
    periods: ['5m', '15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'ADAUSDT',
    exchange: 'binance_futures',
    periods: ['5m','15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'DOTUSDT',
    exchange: 'binance_futures',
    periods: ['5m', '15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'DOGEUSDT',
    exchange: 'binance_futures',
    periods: ['5m', '15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  },
  {
    symbol: 'XRPUSDT',
    exchange: 'binance_futures',
    periods: ['5m', '15m', '1h'],
    trade: {
      currency_capital: 400,
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
        target_percent: 1.0,
        stop_percent: 10.0
      }
    ]
  }
];
