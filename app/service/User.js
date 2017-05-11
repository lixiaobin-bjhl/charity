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

        /**
         * 添加用户
         * @param {string} params.title 用户标题
         * @param {string} params.summary 用户摘要
         * @param {string} params.content 用户内容
         * @param {string} params.subjectId 用户
         * @return {Object}
         */
        * add(params) {
            var User = this.ctx.model.user;
            var user = new User({
                title: params.title,
                summary: params.summary,
                content: params.content,
                author: this.ctx.session.user,
                userSubjectId: mongoose.Types.ObjectId(params.userSubjectId)
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
         * 查找用户列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var userSubjectId = query.userSubjectId;

            if (userSubjectId) {
                condition.userSubjectId = mongoose.Types.ObjectId(userSubjectId);
            } 
            var users = yield this.ctx.model.user.find(condition).sort({createTime: -1});
            return users;
        }

        /**
         * 删除用户
         * @param {string} id  用户id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var user = yield this.ctx.model.user.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete user', user);
                }
            });
            return user;
        }

        /**
         * 批量删除用户
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
            var user = yield this.ctx.model.user.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('batch delete user', user);
                }
            });
            return user;
        }
        
        /**
         * 更新用户 
         * @param {string} id 用户id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.user.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update user ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return User;
};
