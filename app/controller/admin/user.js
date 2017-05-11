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
		this.body = this.helper.success({
			user	
		});
	// 用户名或密码不正确
	} else {
		this.body = this.helper.error(1, '用户名或密码不正确');
	}
};

/**
 * 获取用户列表
 */
exports.index = function* () {

    var query = this.query;
	var list = yield this.service.user.list(query);
	var roles = yield this.service.role.list();
	
	list.forEach((item, index)=> {
		roles.some((role)=> {
			if (item.roleId.toString() == role._id.toString()) {
				Object.assign(list[index], {
					role: role.toJSON()
				});
				return true;
			}
		});
	});
	this.body = this.helper.success({
		list
	});
	
};

/**
 * 删除用户
 */
exports.destroy = function* () {

	var id = this.params.id;
	var query = this.query;
	var ids = query.ids;
	var user = null;

	// 批量删除
	if (ids) {
		user = yield this.service.user.batchDel(ids.split(','));
	} else {
		user = yield this.service.user.del(id);
	}
	this.body = this.helper.success({
		user	
	});
};

/**
 * 编辑用户
 */
exports.update = function* () {

	var id = this.params.id;
	var query = this.request.body;
	var update = {
		updateTime: new Date(),
		content: query.content,
		title: query.title,
		summary: query.summary,
		userSubjectId: query.userSubjectId
	};
	var result = yield this.service.user.put(id, update);
	this.body = this.helper.success(result);
};


