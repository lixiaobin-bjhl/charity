/**
 * @fileOverview charity-shipingAddress-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class ShippingAddress extends app.Service {
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
                author: this.ctx.session.user,
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
         * 根据opendId 查找收货地址信息
         */ 
        * queryByOpenId () {

        }
    }
    return ShippingAddress;
};