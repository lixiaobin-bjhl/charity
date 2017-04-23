/**
 * @fileOverview charity-cms-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {
	class AdminMainController extends app.Controller {
		/**
		 * 后台管理 
		 */
		* index () {
			var user = this.ctx.session.user;
			yield this.ctx.render('/admin/main.tpl', {
				user
			});
		}
		/**
		 * 退出登录 
		 */
		* logout () {
			this.ctx.session = null;
			this.ctx.redirect('/admin/login');
		}
		/**
		 * 登录页面 
		 */
		* login () {
			// var user = yield this.ctx.service.users.find();
			// this.ctx.body = user;

			var user = this.ctx.session.user;

			yield this.ctx.render('/admin/login.tpl', {
				user
			});
		}
	}
	return AdminMainController;
};