/**
 * @fileOverview charity-product-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class Product extends app.Service {
        /**
         * 添加产品
         * @param {string} params.title 产品标题
         * @param {string} params.summary 产品摘要
         * @param {string} params.content 产品内容
         * @param {string} params.subjectId 产品
         * @return {Object}
         */
        * add(params) {
            var Product = this.ctx.model.product;
            var product = new Product({
                title: params.title,
                summary: params.summary,
                content: params.content,
                author: this.ctx.session.user,
                productSubjectId: mongoose.Types.ObjectId(params.productSubjectId)
            });
            product.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add product', product);
                }
            });
            return product;
        }
        /**
         * 查找产品列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var productSubjectId = query.productSubjectId;

            if (productSubjectId) {
                condition.productSubjectId = mongoose.Types.ObjectId(productSubjectId);
            } 
            var list = yield this.ctx.model.product.find(condition).sort({createTime: -1});
            return list;
        }
        /**
         * 删除产品
         * @param {string} id  分闻分类id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var product = yield this.ctx.model.product.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete product', product);
                }
            });
            return product;
        }
        /**
         * 批量删除产品
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
            var product = yield this.ctx.model.product.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('batch delete product', product);
                }
            });
            return product;
        }
        /**
         * 更新产品 
         * @param {string} id 产品id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.product.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update product ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return Product;
};