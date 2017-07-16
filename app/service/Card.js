/**
 * @fileOverview charity-card-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

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

            console.log(123);

            var card = new Card({
                openid: params.openid,
                summary: params.summary,
                mobile: params.mobile,
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
         * 查找新闻列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var newsSubjectId = query.newsSubjectId;

            if (newsSubjectId) {
                condition.newsSubjectId = mongoose.Types.ObjectId(newsSubjectId);
            } 
            var list = yield this.ctx.model.news.find(condition).sort({createTime: -1});
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
            var news = yield this.ctx.model.news.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete news', news);
                }
            });
            return news;
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
         * 更新新闻 
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