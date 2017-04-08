/**
 * @fileOverview charity-home-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {
	class HomeController extends app.Controller {
		* index() {
			const dataList = {
				list: [
					{ id: 1, title: 'this is news 1', url: '/news/1' },
					{ id: 2, title: 'this is news 2', url: '/news/2' }
				],
				name: "xiaobin"
			};
			yield this.ctx.render('home.tpl', dataList);
		}
	}
	return HomeController;
};
