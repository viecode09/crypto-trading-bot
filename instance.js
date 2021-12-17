const c = (module.exports = {});

c.symbols = []

let z = [
    'BTCUSDT', 'ETHUSDT', 'BNBBTC', 'ADAUSDT', 'XRPUSDT', 'DOTUSDT', 'DOGEUSDT', 'SANDUSDT', 'MATICUSDT', 'MANAUSDT', 'SUSHIUSDT'
]

z.forEach((pair) => {
    c.symbols.push({
        'symbol': pair,
        'periods': ['3m', '15m', '1h'],
        'exchange': 'binance_futures',
        'trade': {
            'currency_capital': 200,
            'strategies': [
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
            ]
        },
        'watchdogs': [
            {
                'name': 'risk_reward_ratio',
                'target_percent': 3.1,
                'stop_percent': 4.0
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
*/
