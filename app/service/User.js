/**
 * @fileOverview charity-user-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class User extends app.Service {
        /**
         * 添加用户
         * 
         * @param {string} params.mobile 商户手机
         * @param {string} params.avatarUrl 用户头像
         * @param {string} params.city 用户所在城市
         * @param {string} params.country 用户所在区
         * @param {string} params.province 用户所在省
         * @param {string} params.gender 用户姓别
         * @param {string} params.language 用户使用的微信语言版本
         * @param {string} params.nickName 用户昵称
         * @param {string} params.province 用户所在省
         * @param {string} params.openid 用户的openid
         * 
         * @return {Object}
         */
        * add(params) {
            var User = this.ctx.model.user;
            var user = new User({
                author: {
                    mobile: params.mobile,
                },
                avatarUrl: params.avatarUrl,
                city: params.city,
                country: params.country,
                province: params.province,
                gender: params.gender,
                language: params.language,
                nickName: params.nickName,
                province: params.province,
                openid: params.openid
            });
            user.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add user', user);
                }
            });
            return user;
        }

        /**
         * 根据openid获取用户信息
         * 
         * @param {string} openid
         * 
         * @return {Object}
         */
        * findByOpenid (openid) {
            var condition = {
                openid: openid
            };
            var user = yield this.ctx.model.user.findOne(condition);
            return user;
        }

        /**
         * 更新登录次数
         * 
         * @param {string} openid 
         * @param {number} loginCount
         * 
         * @return {Object}
         */
        * updateLoginCount (openid, loginCount) {
            var condition = {
                openid: openid
            };

            var update = {
                loginCount: loginCount
            };

            this.ctx.model.user.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update user ' + openid, update);
                }
            });
            return {
                openid
            };
        }
    }
    return User;
};
