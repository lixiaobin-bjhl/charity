/**
 * @fileOverview charity-role-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加角色 
 */
exports.create = function* () {
	var query = this.request.body;
	var role = yield this.service.role.add(query);
	
	this.body = this.helper.success({
		role	
	});
};

/**
 * 获取角色列表
 */
exports.index = function* () {
    var query = this.query;
	var list = yield this.service.role.list(query);
	this.body = this.helper.success({
		list
	});
};

/**
 * 删除角色
 */
exports.destroy = function* () {

	var id = this.params.id;
	var query = this.query;
	var ids = query.ids;
	var role = null;

	// 批量删除
	if (ids) {
		role = yield this.service.role.batchDel(ids.split(','));
	} else {
		role = yield this.service.role.del(id);
	}
	this.body = this.helper.success({
		role	
	});
};

/**
 * 编辑角色
 */
exports.update = function* () {

	var id = this.params.id;
	var query = this.request.body;
	var update = {
		updateTime: new Date(),
		name: query.name,
		remark: query.remark,
		authority: query.authority
	};
	var result = yield this.service.role.put(id, update);
	this.body = this.helper.success(result);
};


