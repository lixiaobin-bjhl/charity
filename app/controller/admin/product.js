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
 * 获取产品列表
 */
exports.index = function* () {
    var query = this.query;
    // 如果是微信来的，不要把下架的产品返回给用户
	if (!this.helper.isajax()) {
		query.isNotSale = 0;
	}

	var list = yield this.service.product.list(query);
	this.body = this.helper.success({
		list
	});
};

/**
 * 删除产品
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
 * 查看产品详情
 */
exports.show = function* () {
	var id = this.params.id;
	var product = yield this.service.product.findById(id);

	this.body = this.helper.success(product);
};

/**
 * 编辑产品
 */
exports.update = function* () {

	var id = this.params.id;
	var query = this.request.body;
	var update = {};
	//  更新上架下架状态
	if (typeof query.isNotSale != 'undefined') {
		update = {
			isNotSale: query.isNotSale
		}
	} else {
		update = {
			updateTime: new Date(),
			title: query.title,
			summary: query.summary,
			storageIds: query.storageIds,
			remark: query.remark,
			productSubjectId: query.productSubjectId,
			price: query.price,
			storeCount: query.storeCount,
        	specifications: query.specifications,
			discountPrice: query.discountPrice
		};
	}	
	var result = yield this.service.product.put(id, update);
	this.body = this.helper.success(result);
};


