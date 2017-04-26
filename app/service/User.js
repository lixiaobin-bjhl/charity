/**
 * @fileOverview charity-user-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {

    class User extends app.Service {

        * find() {
            var user = yield this.ctx.model.user.find();
            return user;
        }
        /**
         * 根据手机号和密码获取用户信息
         * @param {number} mobile 手机号
         * @param {string} password 密码
         * @return {Object}
         */
        * getUser(mobile, password) {
            var user = yield this.ctx.model.user.findOne({
                mobile: +mobile,
                password: password
            });
            return user;
        }
    }
    return User;
};
