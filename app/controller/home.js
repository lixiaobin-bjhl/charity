/**
 * @fileOverview charity-home-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {
	class HomeController extends app.Controller {
		* index() {
			// 获取产品分类列表
			var productSubject = yield this.service.productSubject.list();
			// 获取新闻分类列表
			var newsSubject = yield this.service.newsSubject.list();

			yield this.ctx.render('home.tpl', {
				productSubject,
				newsSubject
			});
		}
	}
	return HomeController;
};
