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
         * @param {string} params.name 角色名称
         * @param {string} params.remark 备注
         * @param {Object} params.authority 权限
         * @return {Object}
         */
        * add(params) {
            var Role = this.ctx.model.role;
            var role = new Role({
                name: params.name,
                remark: params.remark,
                authority: params.authority
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
         * 根据角色id找查角色 
         */
        * findById (id) {
            var id = mongoose.Types.ObjectId(id);
            var role = yield this.ctx.model.role.findById(id);
            return role;
        }

        /**
         * 查找角色列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
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