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
 * 获取新闻列表
 */
exports.index = function* () {
    var list = yield  this.service.order.list();
    this.body = this.helper.success(list);
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
    var update = {};
    
    // 发货
    if (query.expressType) {
        update = {
            expressType: query.expressType,
            expressNumber: query.expressNumber,
            isSendExpressTemplate: query.isSendExpressTemplate,
            status: query.status,
            updateTime: new Date(),
            expressRemark: query.expressRemark
        };

    // 结束订单
    } else if (query.status == 3) {
        update = {
            status: 3,
            updateTime: new Date()
        };
    // 支付成功 
    } else {
        update = {
            updateTime: new Date(),
            status: query.status,
            transactionId: query.transactionId,
            bankType: query.bankType,
            feeType: query.feeType,
            tradeType: query.tradeType,
            payTime: query.timeEnd,
            cashFee: query.cashFee
        };
    }
    console.log(update);

    var result = yield this.service.order.put(id, update);
    
    // // 通知用户
    // if (query.isSendExpressTemplate) {
    //     var order = yield this.service.order.findById(id);
    //     var account = yield this.service.account.findByMobile(order.author.mobile);
    //     var token = yield this.service.tool.getAccessToken(account.appId, account.appSecret);
    //     var result = yield this.service.message.send({
    //         token,
    //         touser: order.openid,
    //         templateId: query.templateId,
    //         data: query.data,
    //         formId: query.formId
	//     });
    //     // var user =  yield 
    // }

	this.body = this.helper.success(result);
};