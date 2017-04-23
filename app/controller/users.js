'use strict';

exports.create = function* () {

	var query = this.request.body;
	var mobile = query.mobile;
	var password = query.password;

	var user = yield this.service.users.getUser(mobile, password);

	if (user) {
		this.session.user = user;
	}
	this.body = this.helper.success({
		user	
	});
};

