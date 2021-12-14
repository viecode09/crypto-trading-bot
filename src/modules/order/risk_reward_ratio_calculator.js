const Order = require('../../dict/order');
const ExchangeOrder = require('../../dict/exchange_order');
const OrderUtil = require('../../utils/order_util');

module.exports = class RiskRewardRatioCalculator {
  constructor(logger) {
    this.logger = logger;
  }

  calculateForOpenPosition(position, options = { stop_percent: 3, target_percent: 6 }) {
    let entryPrice = position.entry;
    if (!entryPrice) {
      this.logger.info(`Invalid position entryPrice for stop loss:${JSON.stringify(position)}`);
      return undefined;
    }

    const result = {
      stop: undefined,
      target: undefined
    };

    entryPrice = Math.abs(entryPrice);

    if (position.side === 'long') {
      result.target = entryPrice * (1 + options.target_percent / 100);
      result.stop = entryPrice * (1 - options.stop_percent / 100);
      result.stop1 = entryPrice * (1 - (8 / 100));
      result.stop2 = entryPrice * (1 - (6 / 100));
    } else {
      result.target = entryPrice * (1 - options.target_percent / 100);
      result.stop = entryPrice * (1 + options.stop_percent / 100);
      result.stop1 = entryPrice * (1 + (8 / 100));
      result.stop2 = entryPrice * (1 + (6 / 100));

    }

    return result;
  }

  async syncRatioRewardOrders(position, orders, options) {
    const newOrders = {};

    const riskRewardRatio = this.calculateForOpenPosition(position, options);

    const stopOrders = orders.filter(order => order.type === ExchangeOrder.TYPE_STOP);
    if (stopOrders.length === 0) {
      newOrders.stop = {
        amount: Math.abs(position.amount),
        price: riskRewardRatio.stop
      };
      newOrders.stop1 = {
        amount: Math.abs(position.amount) * 0.5,
        price: riskRewardRatio.stop1
      };

      newOrders.stop2 = {
        amount: Math.abs(position.amount) * 0.75,
        price: riskRewardRatio.stop2
      };

      // inverse price for lose long position via sell
      if (position.side === 'long') {
        newOrders.stop.price = newOrders.stop.price * -1;
        newOrders.stop1.price = newOrders.stop1.price * -1;
        newOrders.stop2.price = newOrders.stop2.price * -1;
      }
    } else {
      // update order
      const stopOrder = stopOrders[0];

      // only +1% amount change is important for us
      if (OrderUtil.isPercentDifferentGreaterThen(position.amount, stopOrder.amount, 1)) {
        let amount = Math.abs(position.amount);
        if (position.isLong()) {
          amount *= 1;
        }

        newOrders.stop = {
          id: stopOrder.id,
          amount: amount
        };

        newOrders.stop1 = {
          amount: amount * 0.5,
          price: riskRewardRatio.stop1
        };

        newOrders.stop2 = {
          amount: amount * 0.75,
          price: riskRewardRatio.stop2
        };

      }
    }

    const targetOrders = orders.filter(order => order.type === ExchangeOrder.TYPE_LIMIT);
    if (targetOrders.length === 0) {
      newOrders.target = {
        amount: Math.abs(position.amount),
        price: riskRewardRatio.target
      };
      // inverse price for lose long position via sell
      if (position.side === 'long') {
        newOrders.target.price = newOrders.target.price * -1;
      }
    } else {
      // update order
      const targetOrder = targetOrders[0];

      // only +1% amount change is important for us
      if (OrderUtil.isPercentDifferentGreaterThen(position.amount, targetOrder.amount, 1)) {
        let amount = Math.abs(position.amount);
        if (position.isLong()) {
          amount *= 1;
        }

        newOrders.target = {
          id: targetOrder.id,
          amount: amount
        };
      }
    }

    return newOrders;
  }

  async createRiskRewardOrdersOrders(position, orders, options) {
    const ratioOrders = await this.syncRatioRewardOrders(position, orders, options);

    const newOrders = [];
    if (ratioOrders.target) {
      if (ratioOrders.target.id) {
        newOrders.push({
          id: ratioOrders.target.id,
          price: ratioOrders.target.price,
          amount: ratioOrders.target.amount
        });
      } else {
        newOrders.push({
          price: ratioOrders.target.price || undefined,
          amount: ratioOrders.target.amount || undefined,
          type: 'target'
        });
      }
    }

    if (ratioOrders.stop) {
      if (ratioOrders.stop.id) {
        newOrders.push({
          id: ratioOrders.stop.id,
          price: ratioOrders.stop.price,
          amount: ratioOrders.stop.amount
        });
      } else {
        newOrders.push({
          price: ratioOrders.stop.price,
          amount: ratioOrders.stop.amount,
          type: 'stop'
        });
      }
    }

    if (ratioOrders.stop1) {
      if (ratioOrders.stop1.id) {
        newOrders.push({
          id: ratioOrders.stop1.id,
          price: ratioOrders.stop1.price,
          amount: ratioOrders.stop1.amount
        });
      } else {
        newOrders.push({
          price: ratioOrders.stop1.price,
          amount: ratioOrders.stop1.amount,
          type: 'stop'
        });
      }
    }

    if (ratioOrders.stop2) {
      if (ratioOrders.stop2.id) {
        newOrders.push({
          id: ratioOrders.stop2.id,
          price: ratioOrders.stop2.price,
          amount: ratioOrders.stop2.amount
        });
      } else {
        newOrders.push({
          price: ratioOrders.stop2.price,
          amount: ratioOrders.stop2.amount,
          type: 'stop'
        });
      }
    }

    return newOrders;
  }
};
