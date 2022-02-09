const c = (module.exports = {});

c.symbols = []

let z = [
    'MATICUSDT', 'NEARUSDT', 'XLMUSDT', 'ADAUSDT', 'SANDUSDT'
]

z.forEach((pair) => {
    c.symbols.push({
        'symbol': pair,
        'periods': ['15m', '1h', '4h'],
        'exchange': 'binance_futures',
        'trade': {
            'currency_capital': 100,
            'strategies': [
               {
                    'strategy': 'obv_pump_dump',
                    'interval': '15m',
                    'options': {
                        'period': '15m'
                    }
                }
            ]
        },
        'watchdogs': [
        {
            'name': 'risk_reward_ratio',
            'target_percent': 2.1,
            'stop_percent': 3.0
        }
        ]
    })
})

/*{
    symbol: 'SANDUSDT',
    exchange: 'binance_futures',
    periods: ['3m', '15m', '1h'],
    trade: {
      currency_capital: 200,
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
        target_percent: 2.0,
        stop_percent: 3.1
      }
    ]
  }
];

                {
                    'strategy': 'cci',
                    'options': {
                        'period': '15m'
                    }
                },
                {
                    'strategy': 'obv_pump_dump'
                },
                {
                    'strategy': 'macd',
                    'options': {
                        'period': '1h'
                    }
                }

*/
