/**
 * @fileOverview charity-tool-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';


var request = require('request');
var Promise = require("bluebird");

/**
 * 获取access token 
 */
function getAccessToken (appId, appSecret) {
    return new Promise((resolve, reject)=> {
        request.get({
            url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' 
            + appId + '&secret=' + appSecret
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                resolve(response.body);
            } else {
                reject('');
            }
        });
    });
}

module.exports = app => {
    /**
     * Tool Service
     */
    class Tool extends app.Service {

        * getAccessToken(appId, appSecret) {
            var result = yield getAccessToken(appId, appSecret);
            var token = JSON.parse(result)['access_token'];
            return token;
        }
    }
    return Tool;
}
