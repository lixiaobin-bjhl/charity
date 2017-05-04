/**
 * @fileOverview charity-productSubject-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加新闻分类 
 */
exports.create = function* () {
    var query = this.request.body;
	var name = query.name;
	var remark = query.remark;
	var productSubject = yield this.service.productSubject.add(name, remark);
	
	this.body = this.helper.success({
		productSubject	
	});
};

/**
 * 获取新闻分类列表
 */
exports.index = function* () {
    var query = this.request.body;
	var list = yield this.service.productSubject.list();
	this.body = this.helper.success({
		list
	});
};

/**
 * 删除新闻分类
 */
exports.destroy = function* () {
	var id = this.params.id;
	var productCount = yield this.service.product.listBySubjectId(id);
	
	if (productCount) {
		this.body = this.helper.error(1, '该分类下已添加产品不能删除');
		return;
	}

	var productSubject = yield this.service.productSubject.del(id);
	this.body = this.helper.success({
		productSubject	
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
		remark: query.remark
	};
	var result = yield this.service.productSubject.put(id, update);
	this.body = this.helper.success(result);
};


