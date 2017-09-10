/**
 * @fileOverview charity-product-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');
var minus = require('../public/scripts/function/minus');
var currency = require('../public/scripts/function/currency');
var specification = require('../public/scripts/function/specification');

module.exports = app => {

    class Product extends app.Service {
        /**
         * 添加产品
         * @param {string} params.title 产品标题
         * @param {string} params.summary 产品摘要
         * @param {string} params.price 产品价格
         * @param {string} params.productSubjectId 产品分类
         * @param {string} params.discountPrice 产品折扣
         * @param {Array} params.storageIds 产品图片存储id
         * @param {Array} params.specifications 产品规格
         * @param {number} params.storeCount 产品库存
         * @param {number} params.remark 产品备注
         * @param {Array} params.customField 产品自定义字段
         * @return {Object}
         */
        * add(params) {
            var Product = this.ctx.model.product;
            var product = new Product({
                title: params.title,
                summary: params.summary,
                author: this.ctx.session.account,
                storageIds: params.storageIds,
                productSubject: params.productSubjectId,
                price: params.price,
                customField: params.customField,
                storeCount: params.storeCount,
        	    specifications: params.specifications,
                discountPrice: params.discountPrice,
                remark: params.remark
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
            var product = yield this.ctx.model.product
                .findById(id)
                .populate('productSubject', '', null);
            
            product = product.toJSON();
            var payPrice = minus(product.price, product.discountPrice || 0);

            Object.assign(product, {
                discoutPriceStr: currency(product.discountPrice),
                priceStr: currency(payPrice),
                payPrice: payPrice,
                specifications: product.specifications.map((item)=> {
                    return {
                        id: item.id,
                        name: specification(item.id),
                        value: item.value
                    }
                })
            });
            return product;
        }

        /**
         * 获取总数
         * 
         * @param {Object} query 列表查询条件
         */
        * total(query) {
            var condition = {};
            var productSubjectId = query.productSubjectId;
            var key = query.key;
            var isNotSale = query.isNotSale;
            var compass = this.ctx.helper.compass();
            if (productSubjectId) {
                condition.productSubject = mongoose.Types.ObjectId(productSubjectId);
            }
            if (typeof isNotSale != 'undefined') {
                condition.isNotSale = isNotSale;
            }
            if (key) {
                condition.title = new RegExp(key);
            }
            Object.assign(condition, compass);
            var count = yield this.ctx.model.product.count(condition);
            return count;
        }

        /**
         * 根据产品ids 获取产品集合
         */
        * listByIds (ids) {
            var condition = {
                _id: {
                    $in: ids.map((id)=> {
                        return mongoose.Types.ObjectId(id)
                    })
                }
            }
            var list = yield this.ctx.model.product.find(condition);
            return list;
        }

        /**
         * 查找产品列表
         * @param {Object} query 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var productSubjectId = query.productSubjectId;
            var key = query.key;
            var pageNum = query.pageNum || this.ctx.app.config.pageDto.pageNum;
            var pageSize = query.pageSize || this.ctx.app.config.pageDto.pageSize;
            var isNotSale = query.isNotSale;
            var compass = this.ctx.helper.compass();

            if (productSubjectId) {
                condition.productSubject = mongoose.Types.ObjectId(productSubjectId);
            }
            if (typeof isNotSale != 'undefined') {
                condition.isNotSale = isNotSale;
            }
            if (key) {
                condition.title = new RegExp(key);
            }
            Object.assign(condition, compass);
            var list = yield this.ctx.model.product.find(condition)
                .skip((pageNum - 1) * pageSize)
                .limit(+pageSize)
                .sort({createTime: -1})
                .populate('productSubject', '', null);

            var result = [];
            list.forEach((item)=> {
                item = item.toJSON();
                var payPrice = minus(item.price, item.discountPrice || 0);
                item.priceStr = currency(payPrice);
                item.payPrice = payPrice;
                item.specifications = item.specifications.map((item)=> {
                    return {
                        id: item.id,
                        name: specification(item.id),
                        value: item.value
                    }
                });
                result.push(item);
            });
            return result;
        }

        /**
         * 根据产品ids 获取产品集合
         */
        * listByIds (ids) {
            var condition = {
                _id: {
                    $in: ids.map((id)=> {
                        return mongoose.Types.ObjectId(id)
                    })
                }
            }
            var list = yield this.ctx.model.product.find(condition);
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