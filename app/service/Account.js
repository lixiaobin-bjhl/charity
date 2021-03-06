/**
 * @fileOverview charity-account-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class Account extends app.Service {

        * find() {
            var account = yield this.ctx.model.account.find();
            return account;
        }
        
        /**
         * 根据手机号查找用户 
         */
        * findByMobile (mobile) {
             var condition = {
                mobile: +mobile
            };
            var account = yield this.ctx.model.account.findOne(condition);
            return account;
        }

        /**
         * 根据手机号和密码获取激活信息
         * @param {number} mobile 手机号
         * @param {string=} password 密码
         * @return {Object}
         */
        * getAccount(mobile, password) {
            var condition = {
                mobile: +mobile,
                isForbidden: 0
            };
            if (password) {
                condition.password = password;
            }
            var account = yield this.ctx.model.account.findOne(condition);
            return account;
        }

        /**
         * 添加帐号
         * @param {string} params.name 姓名
         * @param {string} params.password 密码
         * @param {string} params.remark 备注
         * @param {string} params.mobile 手机
         * @param {string} params.headPic 帐号头像
         * @param {string} params.roleId 帐号角色
         * @param {string} params.masterMobile 主账号的手机号
         * @param {number} params.type 账号类型  0超级账号，1为主账号， 2子账号
         * 
         * @return {Object}
         */
        * add(params) {
            var Account = this.ctx.model.account;
            var account = new Account({
                name: params.name,
                password: params.password,
                appName: params.appName,
			    appId: params.appId,
			    appSecret: params.appSecret,
			    masterOpenid: params.masterOpenid,
                remark: params.remark,
                mobile: params.mobile,
                headPic: params.headPic,
                type: params.type,
                masterMobile: params.masterMobile,
                roleId: mongoose.Types.ObjectId(params.roleId)
            });
            account.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add account', account);
                }
            });
            return account;
        }

        /**
         * 获取账号总数
         */
        * total (query) {
            var condition = {};
            var accountSubjectId = query.accountSubjectId;
            var account = this.ctx.session.account;
            var type = account.type;
            // 非管理员
            if (type) {
                condition.$or = [
                    {
                        mobile: +account.mobile
                    },
                    {
                        mobile: +account.masterMobile
                    }
                ]
            }
            if (accountSubjectId) {
                condition.accountSubjectId = mongoose.Types.ObjectId(accountSubjectId);
            }
            // 管理员才能搜索用户
            if (query.key && !type) {
                var key = new RegExp(query.key);
                condition.$or = [
                    {
                        name: key
                    },
                    {
                        mobile: +query.key
                    }
                ]
            }
            var acount = yield this.ctx.model.account.count(condition);
            return acount;
        }

        /**
         * 查找帐号列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var account = this.ctx.session.account;
            var pageDto = this.ctx.app.config.pageDto;
            var pageNum = query.pageNum || pageDto.pageNum;
            var pageSize = query.pageSize || pageDto.pageSize;
            var type = account.type;

            // 非管理员
            if (type) {
                condition.$or = [
                    {
                        mobile: +account.mobile
                    },
                    {
                        mobile: +account.masterMobile
                    }
                ]
            }
            if (query.type) {
                condition.type = + query.type;
            }
            // 管理员才能搜索用户
            if (query.key && !type) {
                var key = new RegExp(query.key);
                condition.$or = [
                    {
                        name: key
                    },
                    {
                        mobile: +query.key
                    }
                ]
            }
            var accounts = yield this.ctx.model.account.find(condition).sort({createTime: -1});
            return accounts;
        }

        /**
         * 删除帐号
         * @param {string} id  帐号id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var account = yield this.ctx.model.account.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete account', account);
                }
            });
            return account;
        }

        /**
         * 批量删除帐号
         * @param {Array} ids  分闻分类ids
         */
        * batchDel(ids) {
            var condition = {
                _id: {
                    $in: ids.map((id)=> {
                        return mongoose.Types.ObjectId(id)
                    })
                }
            }
            var account = yield this.ctx.model.account.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('batch delete account', account);
                }
            });
            return account;
        }
        
        /**
         * 更新帐号 
         * @param {string} id 帐号id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.account.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update account ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return Account;
};
