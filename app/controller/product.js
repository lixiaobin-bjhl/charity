/**
 * @fileOverview charity-product-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加产品
 */
exports.create = function* () {
	var jquery = this.request.body;
	var product = yield this.service.product.add(jquery);
	
	this.body = this.helper.success({
		product	
	});
};

/**
 * 获取新闻列表
 */
exports.index = function* () {
    var query = this.query;
	var list = yield this.service.product.list(query);
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
	var product = null;

	// 批量删除
	if (ids) {
		product = yield this.service.product.batchDel(ids.split(','));
	} else {
		product = yield this.service.product.del(id);
	}
	this.body = this.helper.success({
		product	
	});
};

/**
 * 编辑产品
 */
exports.update = function* () {

	var id = this.params.id;
	var query = this.request.body;
	var update = {
		updateTime: new Date(),
		title: query.title,
		summary: query.summary,
		productSubjectId: query.productSubjectId,
		price: query.price,
		discountPrice: query.discountPrice
	};
	console.log(update);
	var result = yield this.service.product.put(id, update);
	this.body = this.helper.success(result);
};


