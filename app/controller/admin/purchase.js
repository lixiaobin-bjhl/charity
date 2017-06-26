/**
 * @fileOverview charity purchase
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var request = require('request');
var Promise = require("bluebird");

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
                resolve(body);
            } else {
                reject();
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
            // var options = {
            //     nonce_str: 'dt6f0eq8gukwf2o',
            //     mch_id: 1483041862,
            //     device_info: 1000,
            //     orderNumber: 1498370890951,
            //     openid: 'oe9sM0Tf79ooJm_EgzBYhIxLDIGI',
            //     body: 'test',
            //     total_fee: 0.01,
            //     notify_url: 'https://www.sheliguo.com/purchase/notice',
            //     sign: '6103D21DC873FD42E73F6CB417625334',
            //     appid: 'wx9a725aa4ebad3f02'
            // };
            // var nonce_str = options.nonce_str;
            // var mch_id = options.mch_id;
            // var openid = options.openid;
            // var orderNumber = options.orderNumber;
            // var body = options.body;
            // var total_fee = options.total_fee;
            // var notify_url = options.notify_url;
            // var sign = options.sign; 
            // var appid = options.appid;
            // var ip = '114.115.158.88';

            var formData = '<xml><appid>wx9a725aa4ebad3f02</appid><body>test</body><mch_id>1483041862</mch_id><nonce_str>tywvqtyhhcrpvsu</nonce_str><sign>77BCB669F20224B5274BF47060AB3BF7</sign><openid>oe9sM0Tf79ooJm_EgzBYhIxLDIGI</openid><notify_url>http://www.sheliguo.com/purchase/notice</notify_url><out_trade_no>1498370890951</out_trade_no><total_fee>0.01</total_fee><trade_type>JSAPI</trade_type><spbill_create_ip>114.115.158.88</spbill_create_ip></xml>';
            // formData += '<appid>' + appid + '</appid>';
            // formData += '<body>' + body + '</body>';
            // formData += '<mch_id>' + mch_id + '</mch_id>';
            // formData += '<nonce_str>' + nonce_str + '</nonce_str>';
            // formData += '<sign>' + sign + '</sign>';
            // formData += '<notify_url>' + notify_url + '</notify_url>';
            // formData += '<openid>' + openid + '</openid>';
            // formData += '<out_trade_no>' +  orderNumber + '</out_trade_no>';
            // formData += '<total_fee>' +  total_fee + '</total_fee>';
            // formData += '<trade_type>JSAPI</trade_type>';
            // formData += '<spbill_create_ip>' +  ip + '</spbill_create_ip>';
            // formData += '</xml>';


            // var formData = '<xml><appid>wx2421b1c4370ec43b</appid><attach>支付测试</attach><body>JSAPI支付测试</body><mch_id>10000100</mch_id><nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str><notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url><openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid><out_trade_no>1415659990</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip><total_fee>1</total_fee><trade_type>JSAPI</trade_type><sign>0CB01533B8C1EF103065174F50BCA001</sign></xml>'

            console.log(formData);
            
            var res = yield getUnifiedorder(formData);
            this.ctx.body = res; 
        }
    }

    return PurchaseController;
}