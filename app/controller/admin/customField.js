/**
 * @fileOverview charity-customField-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加新闻分类 
 */
exports.create = function* () {
    var query = this.request.body;
	var customField = yield this.service.customField.add(query);
	this.body = this.helper.success({
		customField	
	});
};

/**
 * 获取新闻分类列表
 */
exports.index = function* () {
    var query = this.request.body;
	var list = yield this.service.customField.list();
	this.body = this.helper.success({
		list
	});
};

/**
 * 删除新闻分类
 */
exports.destroy = function* () {
	var id = this.params.id;
	var productCount = yield this.service.product.countBySubjectId(id);
	
	if (productCount) {
		this.body = this.helper.error('0051', '该分类下已添加产品不能删除');
		return;
	}

	var customField = yield this.service.customField.del(id);
	this.body = this.helper.success({
		customField	
	});
};

/**
 * 编辑分类
 */
exports.update = function* () {
	var id = this.params.id;
	var query = this.request.body;
	var update = {
		updateTime: new Date(),
		name: query.name,
		default: query.default,
		required: query.required,
		type: query.type,
		options: query.options,
		remark: query.remark
	};
	var result = yield this.service.customField.put(id, update);
	this.body = this.helper.success(result);
};


