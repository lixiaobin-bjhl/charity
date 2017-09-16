/**
 * @fileOverview charity-user-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var request = require('request');
var Promise = require("bluebird");

/**
 * code 换取 session_key
 */
function jscode2session(params) {
    return new Promise(function (resolve, reject) {
        request.get({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' 
            + params.appid + '&secret=' 
            + params.secret + '&js_code=' 
            + params.code + '&grant_type=authorization_code'
        }, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                resolve(response);
            } else {
                reject('');
            }
        });
    })
}

/**
 * 添加用户
 */
exports.create = function* () {

    var query = this.request.body;
    var openid = query.openid;
    var u = yield this.service.user.findByOpenid(openid);
    // 用户已存在就更新登录次数
    if (u) {
        var openid = yield this.service.user.updateLoginCount(openid, ++ u.loginCount);
        this.body = this.helper.success(u);
    } else {
        var user = yield this.service.user.add(query);
        this.body = this.helper.success(user);
    }

};

/**
 * code 换取 session_key
 */
exports.jscode2session = function* () {
    var query = this.request.body;
    var result = yield jscode2session(query);
    this.body = this.helper.success(result);
};

/**
 * 获取用户列表 
 */
exports.index = function* () {
    var query = this.query;
    var list = yield  this.service.user.list(query);
    var count = yield this.service.user.total(query);
    this.body = this.helper.success({
        list,
        count
    });
}
