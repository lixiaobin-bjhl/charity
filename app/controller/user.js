/**
 * @fileOverview charity-user-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 用户登录 
 */
exports.create = function* () {

	var query = this.request.body;
	var mobile = query.mobile;
	var password = query.password;

	var user = yield this.service.user.getUser(mobile, password);

	if (user) {
		this.session.user = user;
	}
	this.body = this.helper.success({
		user	
	});
};

