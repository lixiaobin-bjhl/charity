/**
 * @fileOverview charity-about-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {
	class Token extends app.Controller {
		* index() {
            this.ctx.body = this.ctx.helper.success(this.ctx.csrf);
		}
	}
	return Token;
};
