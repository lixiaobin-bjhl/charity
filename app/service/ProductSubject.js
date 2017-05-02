/**
 * @fileOverview charity-productSubject-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class ProductSubject extends app.Service {
        /**
         * 添加新闻分类
         * @param {string} name 分类名称
         * @param {string} remark 分类备注信息
         * @return {Object}
         */
        * add(name, remark) {
            var ProductSubject = this.ctx.model.productSubject;
            var productSubject = new ProductSubject({
                name: name,
                remark: remark
            });
            productSubject.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add productSubject', productSubject);
                }
            });
            return productSubject;
        }
        /**
         * 查找新闻分类列表 
         */
        * list() {
            var list = yield this.ctx.model.productSubject.find({});
            return list;
        }
        /**
         * 删除新闻分类
         * @param {string} id  分闻分类id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var productSubject = yield this.ctx.model.productSubject.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete productSubject', productSubject);
                }
            });
            return productSubject;
        }
        /**
         * 更新新闻分类 
         * @param {string} id 新闻分类id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.productSubject.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update productSubject ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return ProductSubject;
};