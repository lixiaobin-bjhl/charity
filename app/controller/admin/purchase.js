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
function getUnifiedorder (formData) {
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
        * getPrepayId () {
            var query = this.ctx.request.body;
            var sign = getMd5Sign(query);
            
            var formData = '<xml>';
            formData += '<appid>' + query.appid + '</appid>';
            formData += '<body>' + query.body + '</body>';
            formData += '<mch_id>' + query.mch_id + '</mch_id>';
            formData += '<nonce_str>' + query.nonce_str + '</nonce_str>';
            formData += '<sign>' + sign + '</sign>';
            formData += '<notify_url>' + query.notify_url + '</notify_url>';
            formData += '<openid>' + query.openid + '</openid>';
            formData += '<out_trade_no>' +  query.out_trade_no + '</out_trade_no>';
            formData += '<total_fee>' +  query.total_fee + '</total_fee>';
            formData += '<trade_type>' + query.trade_type + '</trade_type>';
            formData += '<spbill_create_ip>' +  query.spbill_create_ip + '</spbill_create_ip>';
            formData += '</xml>';

            var res = yield getUnifiedorder(formData);
            this.ctx.body = res;
        }

        /**
         * 支付成功后通知
         */
        notice () {
            var query = this.ctx.request.body;
            console.log(query);
            this.ctx.body = 123;
        }
    }

    return PurchaseController;
}