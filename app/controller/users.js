'use strict';


exports.create = function* () {

	var query = this.request.body;
	var mobile = query.mobile;
	var password = query.password;

	var isValid = yield this.service.users.validate(mobile, password);

	this.body = {
		isValid
	};
};

