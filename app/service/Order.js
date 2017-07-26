/**
 * @fileOverview charity-order-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class Order extends app.Service {
        /**
         * 添加到购物车
         * 
         * @param {string} params.openid 操作人
         * @param {Array} params.products 商品信息
         * @param {string} params.shippingAddress 用户收件地址
         * @param {number} params.discountMoney 折扣信息
         * @param {number} params.status 支付状态 0 未支付  1支付成功 2 待发货 3 待收货 4交易完成
         * @param {string} params.remark 备注信息
         * @param {string} params.mchId 商户mchId
         * @param {string} params.outTradeNo 系统订单
         * @param {string} params.mobile 商家手机号
         * @param {string} params.expressMoney 快递费用
         * @param {number} params.totalFee 订单金额 
         *
         * @return {Object}
         */
        * add(params) {
            var Order = this.ctx.model.order;
            var order = new Order({
                openid: params.openid,
                products: params.products,
                remark: params.remark,
                expressMoney: params.expressMoney,
                shippingAddress: params.shippingAddress,
                discountMoney: params.discountMoney,
                status: params.status,
                mchId: params.mchId,
                mobile: params.mobile,
                outTradeNo: params.outTradeNo,
                totalFee: params.totalFee
            });
            order.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add order', order);
                }
            });
            return order;
        }

        /**
         * 根据opendId找到订单信息
         */ 
        * listByOpenid (openid) {
            var condition = {
                openid: openid
            };
            var list = yield this.ctx.model.order.find(condition)
            .sort({createTime: -1})
            .populate('shippingAddress', '', null)
            .populate('products.product', '', null);
            
            return list; 
        }
    }
    return Order;
};