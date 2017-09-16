/**
 * @fileOverview charity-account-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 帐号登录 
 */
exports.create = function* () {

	var query = this.request.body;
	var mobile = query.mobile;
	var password = query.password;
	var roleId = query.roleId;
	var account = yield this.service.account.getAccount(mobile, password);
		
	// 有角色id参数，就认为是创建帐号
	if (roleId) {
		// 系统中已存在该手机号，不能再注册
		if (account) {
			this.body = this.helper.error('0011', '该手机号在系统中已存在，不能再添加，你可以编辑或删除');
			return;
		} else {
			account = yield this.service.account.add(query);
			this.body = this.helper.success({
				account	
			});
			return;	
		}
	}

	// 登录
	if (account) {
		this.session.account = {
			type: account.type,
			mobile: account.mobile,
			name: account.name,
			headPic: account.headPic,
			_id: account._id,
			masterMobile: account.masterMobile
		};
		var role = yield this.service.role.findById(account.roleId)
		var authority = role.authority;
		// TODO(lixiaobin) authority 存储到redis中	
		this.session.authority = authority;
		this.body = this.helper.success(account);
	// 帐号名或密码不正确
	} else {
		this.body = this.helper.error('0012', '帐号名或密码不正确');
	}
};

/**
 * 获取帐号列表
 */
exports.index = function* () {

    var query = this.query;
	var list = yield this.service.account.list(query);
	var roles = yield this.service.role.list();
	var count = yield this.service.account.total(query);
	
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
		list,
		count
	});
	
};

/**
 * 删除帐号
 */
exports.destroy = function* () {

	var id = this.params.id;
	var query = this.query;
	var ids = query.ids;
	var account = null;

	// 批量删除
	if (ids) {
		account = yield this.service.account.batchDel(ids.split(','));
	} else {
		account = yield this.service.account.del(id);
	}
	this.body = this.helper.success({
		account
	});
};

/**
 * 编辑帐号
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
			appName: query.appName,
			appId: query.appId,
			appSecret: query.appSecret,
			masterOpenid: query.masterOpenid,
			roleId: query.roleId,
			mobile: query.mobile,
			headPic: query.headPic,
			remark: query.remark,
			type: query.type,
			masterMobile: query.masterMobile
		};
	}
	var result = yield this.service.account.put(id, update);
	this.body = this.helper.success(result);
};


