/**
 * @fileOverview charity-user-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {

    class Users extends app.Service {

        * find() {
            var user = yield this.ctx.model.users.find();
            return user;
        }
        /**
         * 验证手机号和密码是否正确
         * @param {numbser} mobile 手机号
         * @param {string} password 密码
         * @return {boolean} 是否验证通过
         */
        * validate(mobile, password) {
            var count = yield this.ctx.model.users.find({
                mobile: +mobile,
                password: password
            }).count();
            return count > 0;
        }
    }
    return Users;
};
