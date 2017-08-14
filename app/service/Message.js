/**
 * @fileOverview charity-message-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';


var request = require('request');
var Promise = require("bluebird");

/**
 * 发送消息 
 */
function send (params, app) {
	return new Promise((resolve, reject)=> {
        var form = {
            touser: params.touser,
            template_id: params.templateId,
            form_id: params.formId,
            data: params.data
        };
        request({
            method: 'POST',
            json: true,
            headers: {
                "content-type": "application/json",
            },
            url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + params.token,
            body: form
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                app.logger.info('add a template message success', form);
                resolve(response.body);
            } else {
                app.logger.info('add a template message fail', form);
                reject('');
            }
        });
    });
}

module.exports = app => {
    /**
     * Tool Service
     */
    class Message extends app.Service {

        * send(params) {
            app.logger.info('add a template message', params);
            var result = yield send(params, app)
            return result;
        }
    }
    return Message;
}
