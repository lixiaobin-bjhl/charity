/**
 * @fileOverview charity-news-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加新闻 
 */
exports.create = function* () {
	var query = this.request.body;
	var news = yield this.service.news.add(query);
	
	this.body = this.helper.success({
		news	
	});
};

/**
 * 获取新闻列表
 */
exports.index = function* () {
    var query = this.query;
	var list = yield this.service.news.list(query);
	this.body = this.helper.success({
		list
	});
};

/**
 * 删除新闻
 */
exports.destroy = function* () {

	var id = this.params.id;
	var query = this.query;
	var ids = query.ids;
	var news = null;

	// 批量删除
	if (ids) {
		news = yield this.service.news.batchDel(ids.split(','));
	} else {
		news = yield this.service.news.del(id);
	}
	this.body = this.helper.success({
		news	
	});
};

/**
 * 编辑新闻
 */
exports.update = function* () {

	var id = this.params.id;
	var query = this.request.body;
	var update = {
		updateTime: new Date(),
		content: query.content,
		title: query.title,
		summary: query.summary,
		newsSubjectId: query.newsSubjectId
	};
	var result = yield this.service.news.put(id, update);
	this.body = this.helper.success(result);
};


