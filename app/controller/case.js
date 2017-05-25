/**
 * @fileOverview charity-case-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var abstractController = require('./abstractController');

module.exports = app => {
	class CaseController extends abstractController(app) {
		* index() {
			// 获取产品分类列表
			var productSubject = yield this.getProductSubject();
			// 获取新闻分类列表
			var newsSubject = yield this.getNewsSubject();

			yield this.ctx.render('case.tpl', {
				productSubject,
				newsSubject,
				page: 'case'
			});
		}
	}
	return CaseController;
};
