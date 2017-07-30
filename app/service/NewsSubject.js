/**
 * @fileOverview charity-newsSubject-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class NewsSubject extends app.Service {
        /**
         * 添加新闻分类
         * @param {string} name 分类名称
         * @param {string} remark 分类备注信息
         * @return {Object}
         */
        * add(name, remark) {
            var NewsSubject = this.ctx.model.newsSubject;
            var newsSubject = new NewsSubject({
                name: name,
                author: this.ctx.session.account,
                remark: remark
            });
            newsSubject.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add newsSubject', newsSubject);
                }
            });
            return newsSubject;
        }
        /**
         * 查找新闻分类列表 
         */
        * list() {
            var list = yield this.ctx.model.newsSubject.find({});
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
            var newsSubject = yield this.ctx.model.newsSubject.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete newsSubject', newsSubject);
                }
            });
            return newsSubject;
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
            this.ctx.model.newsSubject.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update newsSubject ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return NewsSubject;
};