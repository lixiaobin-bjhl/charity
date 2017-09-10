/**
 * @fileOverview charity-card-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose')
var minus = require('../public/scripts/function/minus')
var currency = require('../public/scripts/function/currency')
var specification = require('../public/scripts/function/specification')

module.exports = app => {

    class Card extends app.Service {
        /**
         * 添加到购物车
         * @param {string} params.openid 操作人
         * @param {string} params.product 商品信息
         * @param {string} params.mobile 商家电话
         * @return {Object}
         */
        * add(params) {
            var Card = this.ctx.model.card;

            var card = new Card({
                openid: params.openid,
                count: params.count,
                summary: params.summary,
                user: params.user,
                author: {
                    mobile: +params.mobile,
                },
                product: params.product
            });
            card.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add card', card);
                }
            });
            return card;
        }

        /**
         * 根据openid 查找购物车数据 
         */
        * getListByOpenid (openid) {
            var condition = {
                openid: openid
            };
            var compass = this.ctx.helper.compass();
            Object.assign(condition, compass);
            var list = yield this.ctx.model.card.find(condition)
            .sort({createTime: -1})
            .populate('product', '', null);

            var result = [];
            list.forEach((item)=> {
                item = item.toJSON();
                var payPrice = minus(item.product.price, item.product.discountPrice || 0);
                item.product.priceStr = currency(payPrice);
                item.product.payPrice = payPrice;
                item.product.specifications = item.product.specifications.map((item)=> {
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
         * 根据openid 查找购物车数据 
         */
        * getCountByOpenid (openid) {
            var result = yield this.ctx.model.card.count({
                openid: openid
            });
            return result;
        }

        /**
         * 删除购物车中的产品ids
         */
        * delByPids (openid, pids) {
            var condition = {
                openid: openid,
                product: {
                    $in: pids.map((id)=> {
                        return mongoose.Types.ObjectId(id)
                    })
                }
            };

            var card = yield this.ctx.model.card.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete ' + openid + 'cards', card);
                }
            });
    
            return card;
        }

        /**
         * 获取总数
         */
        * total () {
            var condition = {};
            var compass = this.ctx.helper.compass();
            Object.assign(condition, compass);
            var count = yield this.ctx.model.card.count(condition);
            return count;
        }

        /**
         * 查找购物车列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var compass = this.ctx.helper.compass();
            var pageNum = query.pageNum || this.ctx.app.config.pageDto.pageNum;
            var pageSize = query.pageSize || this.ctx.app.config.pageDto.pageSize;
            Object.assign(condition, compass);
            var list = yield this.ctx.model.card.find(condition)
                .skip((pageNum - 1) * pageSize)
                .limit(+pageSize)
                .sort({createTime: -1})
                .populate('user', '', null)
                .populate('product', '', null)
            return list;
        }

        /**
         * 根据新闻分类id查找新闻数量
         * @param {Object} newsSubjectId 新闻分类
         */
        * countBySubjectId(newsSubjectId) {
            var condition = {
                newsSubjectId: mongoose.Types.ObjectId(newsSubjectId)
            };
            var count = yield this.ctx.model.news.count(condition);
            return count;
        }

        /**
         * 删除新闻
         * @param {string} id  分闻分类id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var card = yield this.ctx.model.card.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete card', card);
                }
            });
            return card;
        }

        /**
         * 批量删除新闻
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
            var news = yield this.ctx.model.news.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('batch delete news', news);
                }
            });
            return news;
        }
        
        /**
         * 更新购物车
         * @param {string} id 新闻id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.news.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update news ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return Card;
};