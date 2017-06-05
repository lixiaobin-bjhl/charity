/**
 * @fileOverview charity-join-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var abstractController = require('./abstractController');

module.exports = app => {
	class TeamController extends abstractController(app) {
		* index() {
			// 获取产品分类列表
			var productSubject = yield this.getProductSubject();
			// 获取新闻分类列表
			var newsSubject = yield this.getNewsSubject();

			yield this.ctx.render('team.tpl', {
				productSubject,
				newsSubject,
				page: 'team',
				env: this.ctx.helper.env()
			});
		}
	}
	return TeamController;
};
