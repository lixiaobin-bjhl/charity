/**
 * @fileOverview charity-news-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var abstractController = require('./abstractController');

module.exports = app => {
	class NewsController extends abstractController(app) {
		* index() {
			// 获取产品分类列表
			var productSubject = yield this.getProductSubject();
			// 获取新闻分类列表
			var newsSubject = yield this.getNewsSubject();

			yield this.ctx.render('news.tpl', {
				productSubject,
				newsSubject,
				page: 'news'
			});
		}
	}
	return NewsController;
};
