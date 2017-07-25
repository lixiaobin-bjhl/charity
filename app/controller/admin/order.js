/**
 * @fileOverview charity-order-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 创建订单 
 */
exports.create = function* () {
    var query = this.request.body;
    var order = yield this.service.order.add(query);
    this.body = this.helper.success(order);
}