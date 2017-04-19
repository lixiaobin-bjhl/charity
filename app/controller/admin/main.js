/**
 * @fileOverview charity-cms-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {
	class AdminMainController extends app.Controller {
		* index () {
			const dataList = {
				list: [
					{ id: 1, title: 'this is news 1', url: '/news/1' },
					{ id: 2, title: 'this is news 2', url: '/news/2' }
				]
			};
			yield this.ctx.render('/admin/main.tpl', dataList);
		}

		* login () {
			// var user = yield this.ctx.service.users.find();
			// this.ctx.body = user;
			yield this.ctx.render('/admin/login.tpl', {});
		}
	}
	return AdminMainController;
};
