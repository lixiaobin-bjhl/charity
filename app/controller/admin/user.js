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
	var roleId = query.roleId;
	var user = yield this.service.user.getUser(mobile);
		
	// 有角色id参数，就认为是创建用户
	if (roleId) {
		// 系统中已存在该手机号，不能再注册
		if (user) {
			this.body = this.helper.error('0011', '该手机号在系统中已存在，不能再添加，你可以编辑或删除');
			return;
		} else {
			user = yield this.service.user.add(query);
			this.body = this.helper.success({
				user	
			});
			return;	
		}
	}

	// 登录
	if (user) {
		this.session.user = user;
		var role = yield this.service.role.findById(user.roleId)
		var authority = role.authority;
		// TODO(lixiaobin) authority 存储到redis中	
		this.session.authority = authority;
		this.body = this.helper.success({
			user	
		});
	// 用户名或密码不正确
	} else {
		this.body = this.helper.error('0012', '用户名或密码不正确');
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
	var isForbidden = query.isForbidden;
	var update = {}; 

	// 更新禁用状态
	if (typeof isForbidden !== 'undefined') {
		update = {
			isForbidden: isForbidden
		};
	} else {
		update = {
			updateTime: new Date(),
			name: query.name,
			roleId: query.roleId,
			mobile: query.mobile,
			headPic: query.headPic,
			remark: query.remark,
			type: query.type,
			masterMobile: query.masterMobile
		};
	}
	var result = yield this.service.user.put(id, update);
	this.body = this.helper.success(result);
};


