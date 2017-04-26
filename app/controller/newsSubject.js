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
 * 删除资源
 */
exports.destroy = function* () {
	var id = this.params.id;
	var newsSubject = yield this.service.newsSubject.del(id);
	this.body = this.helper.success({
		newsSubject	
	});
}