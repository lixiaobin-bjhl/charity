/**
 * @fileOverview charity-user-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

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
