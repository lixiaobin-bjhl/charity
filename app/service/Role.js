/**
 * @fileOverview charity-role-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class Role extends app.Service {
        /**
         * 添加角色
         * @param {string} params.title 角色标题
         * @param {string} params.summary 角色摘要
         * @param {string} params.content 角色内容
         * @param {string} params.subjectId 角色
         * @return {Object}
         */
        * add(params) {
            var Role = this.ctx.model.role;
            var role = new Role({
                title: params.title,
                summary: params.summary,
                content: params.content,
                author: this.ctx.session.user,
                roleSubjectId: mongoose.Types.ObjectId(params.roleSubjectId)
            });
            role.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add role', role);
                }
            });
            return role;
        }

        /**
         * 查找角色列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var roleSubjectId = query.roleSubjectId;

            if (roleSubjectId) {
                condition.roleSubjectId = mongoose.Types.ObjectId(roleSubjectId);
            } 
            var list = yield this.ctx.model.role.find(condition).sort({createTime: -1});
            return list;
        }

        /**
         * 删除角色
         * @param {string} id  角色id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var role = yield this.ctx.model.role.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete role', role);
                }
            });
            return role;
        }

        /**
         * 批量删除角色
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
            var role = yield this.ctx.model.role.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('batch delete role', role);
                }
            });
            return role;
        }
        
        /**
         * 更新角色 
         * @param {string} id 角色id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.role.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update role ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return Role;
};