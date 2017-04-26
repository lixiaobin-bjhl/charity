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