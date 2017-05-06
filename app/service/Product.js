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
         * @param {string} params.price 产品价格
         * @param {string} params.productSubjectId 产品分类
         * @param {string} params.discountPrice 产品折扣
         * @param {string} params.storageId 产品图片存储id
         * @return {Object}
         */
        * add(params) {
            var Product = this.ctx.model.product;
            var product = new Product({
                title: params.title,
                summary: params.summary,
                author: this.ctx.session.user,
                storageId: params.storageId,
                productSubjectId: params.productSubjectId,
                price: params.price,
                discountPrice: params.discountPrice
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
         * 根据产品id找查产品  
         */
        * findById (id) {
            var id = mongoose.Types.ObjectId(id);
            var product = yield this.ctx.model.product.findById(id);
            var productSubject = yield this.ctx.model.productSubject.findById(product.productSubjectId);
            
            product = product.toJSON();
            Object.assign(product, {
                productSubject: productSubject.toJSON()
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
            var key = query.key;

            if (productSubjectId) {
                condition.productSubjectId = mongoose.Types.ObjectId(productSubjectId);
            }
            if (key) {
                condition.title = new RegExp(key);
            }

            var list = yield this.ctx.model.product.find(condition).sort({createTime: -1});
            return list;
        }

        /**
         * 查找产品数量
         * @param {Object} productSubjectId 产品分类Id
         */
        * countBySubjectId(productSubjectId) {
            var condition = {
                productSubjectId: mongoose.Types.ObjectId(productSubjectId)
            };
            var count = yield this.ctx.model.product.count(condition);
            return count;
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