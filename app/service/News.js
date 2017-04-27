/**
 * @fileOverview charity-news-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class News extends app.Service {
        /**
         * 添加新闻分类
         * @param {string} name 分类名称
         * @param {string} remark 分类备注信息
         * @return {Object}
         */
        * add(name, remark) {
            var News = this.ctx.model.news;
            var news = new News({
                name: name,
                remark: remark
            });
            news.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add news', news);
                }
            });
            return news;
        }
        /**
         * 查找新闻分类列表
         * @param {Object} condition 列表查询条件
         */
        * list(query = {}) {
            var condition = {};
            var newsSubjectId = query.newsSubjectId;

            if (newsSubjectId) {
                condition.newsSubjectId = mongoose.Types.ObjectId(newsSubjectId);
            } 
            var list = yield this.ctx.model.news.find(condition);
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
         * 更新新闻分类 
         * @param {string} id 新闻分类id
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
    return News;
};