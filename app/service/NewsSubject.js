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
                    app.logger.err(err);
                } else {
                    app.logger.info('delete newsSubject', newsSubject);
                }
            });
            return newsSubject;
        }
    }
    return NewsSubject;
};