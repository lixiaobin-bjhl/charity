/**
 * @fileOverview charity-join-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var abstractController = require('./abstractController');

module.exports = app => {
	class JoinController extends abstractController(app) {
		* index() {
			// 获取产品分类列表
			var productSubject = yield this.getProductSubject();
			// 获取新闻分类列表
			var newsSubject = yield this.getNewsSubject();

			yield this.ctx.render('join.tpl', {
				productSubject,
				newsSubject,
				page: 'join',
				env: this.ctx.helper.env()
			});
		}
	}
	return JoinController;
};
