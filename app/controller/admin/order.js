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

/**
 * 编辑订单信息
 */
exports.update = function* () {
	var id =  this.params.id;
	var query = this.request.body;
	var update = {
		updateTime: new Date(),
        status: query.status,
        transactionId: query.transactionId,
        bankType: query.bankType,
        feeType: query.feeType,
        tradeType: query.tradeType,
        payTime: query.timeEnd,
        cashFee: query.cashFee
	};
	var result = yield this.service.order.put(id, update);
	this.body = this.helper.success(result);
};
