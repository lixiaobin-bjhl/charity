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

/**
 * 根据openid 找到订单信息
 */
exports.listByOpenid = function* () {
    var openid = this.request.body.openid;
    var list = yield this.service.order.listByOpenid(openid);
    this.body = this.helper.success(list);
};