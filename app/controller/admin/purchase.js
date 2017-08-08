/**
 * @fileOverview charity purchase
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var request = require('request');
var Promise = require("bluebird");
var getMd5Sign = require('../../public/scripts/function/getMd5Sign');
var parser = require('xml2json');

/**
 * 通用微信API 获取unifiedorder 预交易id 
 */
function getUnifiedorder(formData) {
    return new Promise(function (resolve, reject) {
        request({
            url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            method: 'POST',
            body: formData
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                resolve(parser.toJson(body));
            } else {
                reject('');
            }
        });
    })
}

module.exports = app => {
    class PurchaseController extends app.Controller {
        /**
         * 生成预支付交易单 
         */
        * getPrepayId() {
            var query = this.ctx.request.body;
            query.body = query.body.toString("utf-8");

            var sign = getMd5Sign(query);

            var formData = '<xml>';
            formData += '<appid>' + query.appid + '</appid>';
            formData += '<attach>' + query.attach + '</attach>'
            formData += '<body><![CDATA[' + query.body + ']]></body>';
            formData += '<mch_id>' + query.mch_id + '</mch_id>';
            formData += '<nonce_str>' + query.nonce_str + '</nonce_str>';
            formData += '<sign>' + sign + '</sign>';
            formData += '<notify_url>' + query.notify_url + '</notify_url>';
            formData += '<openid>' + query.openid + '</openid>';
            formData += '<out_trade_no>' + query.out_trade_no + '</out_trade_no>';
            formData += '<total_fee>' + query.total_fee + '</total_fee>';
            formData += '<trade_type>' + query.trade_type + '</trade_type>';
            formData += '<spbill_create_ip>' + query.spbill_create_ip + '</spbill_create_ip>';
            formData += '</xml>';

            this.ctx.app.logger.info('prepayid', formData);
            var res = yield getUnifiedorder(formData);
            this.ctx.body = res;
        }

        /**
         * 支付成功后通知
         */
        * notice() {
            var postBody = yield this.ctx.getPostStreamBody(this.ctx);
            var data = parser.toJson(postBody, {
                object: true
            });
            data = data.xml;

            this.ctx.app.logger.info('purchase notice body', data);
            // 更新一下订单信息
            yield this.ctx.service.order.put(data.attach, {
                updateTime: new Date(),
                status: 1,
                transactionId: data.transaction_id,
                bankType: data.bank_type,
                feeType: data.fee_type,
                tradeType: data.trade_type,
                payTime: data.time_end,
                cashFee: data.cash_fee
            });

            this.ctx.body = '<xml><return_code>SUCCESS</return_code><return_msg>OK</return_msg></xml>';
        }
    }

    return PurchaseController;
}