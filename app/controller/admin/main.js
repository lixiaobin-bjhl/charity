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
			var account = this.ctx.session.account;
			var authority = this.ctx.session.authority;
			yield this.ctx.render('/admin/main.tpl', {
				account,
				env: this.ctx.helper.env(),
				authority: JSON.stringify(authority),
				accountStr: JSON.stringify(account)
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
			var account = this.ctx.session.account;
			yield this.ctx.render('/admin/login.tpl', {
				account,
				env: this.ctx.helper.env()
			});
		}
	}
	return AdminMainController;
};