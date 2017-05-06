/**
 * @fileOverview charity-newsSubject-api
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
	var newsSubject = yield this.service.newsSubject.add(name, remark);
	
	this.body = this.helper.success({
		newsSubject	
	});
};

/**
 * 获取新闻分类列表
 */
exports.index = function* () {
    var query = this.request.body;
	var list = yield this.service.newsSubject.list();
	this.body = this.helper.success({
		list
	});
};

/**
 * 删除新闻分类
 */
exports.destroy = function* () {
	var id = this.params.id;
	var newsCount = yield this.service.news.countBySubjectId(id);
	
	if (newsCount) {
		this.body = this.helper.error(1, '该分类下已添加新闻不能删除');
		return;
	}
	var newsSubject = yield this.service.newsSubject.del(id);
	this.body = this.helper.success({
		newsSubject	
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
	var result = yield this.service.newsSubject.put(id, update);
	this.body = this.helper.success(result);
};


