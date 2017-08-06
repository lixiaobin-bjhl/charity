/**
 * @fileOverview charity-order-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose')
var minus = require('../public/scripts/function/minus')
var currency = require('../public/scripts/function/currency')
var specification = require('../public/scripts/function/specification')

module.exports = app => {

    class Order extends app.Service {
        /**
         * 创建订单
         * 
         * @param {string} params.openid 操作人
         * @param {Array} params.products 商品信息
         * @param {string} params.shippingAddress 帐号收件地址
         * @param {number} params.discountMoney 折扣信息
         * @param {number} params.status 支付状态 0 未支付  1支付成功 2 待发货 3 待收货 4交易完成
         * @param {string} params.remark 备注信息
         * @param {string} params.mchId 商户mchId
         * @param {string} params.outTradeNo 系统订单
         * @param {string} params.mobile 商家手机号
         * @param {string} params.user 用户id
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
                user: params.user,
                message: params.message,
                expressMoney: params.expressMoney,
                shippingAddress: params.shippingAddress,
                discountMoney: params.discountMoney,
                status: params.status,
                mchId: params.mchId,
                author: {
                    mobile: +params.mobile,
                },
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
         * 获取订单列表
         */
        * list () {
            var condition = {};
            var compass = this.ctx.helper.compass();
            Object.assign(condition, compass);
            var list = yield this.ctx.model.order.find(condition)
                .sort({createTime: -1})
                .populate('shippingAddress', '', null)
                .populate('user', '', null)
                .populate('products.product', '', null);
            return list;
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
            
            var result = [];
            list.forEach((item)=> {
                item = item.toJSON();
                item.products.forEach((n)=> {
                    var payPrice = minus(n.product.price, n.product.discountPrice || 0);
                    n.product.priceStr = currency(payPrice);
                    n.product.payPrice = payPrice;
                    n.product.specifications = n.product.specifications.map((m)=> {
                        return {
                            id: m.id,
                            name: specification(m.id),
                            value: m.value
                        }
                    });
                });
                result.push(item);
            });
            return result;
        }
    }
    return Order;
};