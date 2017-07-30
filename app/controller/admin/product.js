/**
 * @fileOverview charity-product-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';


var minus = require('../../public/scripts/function/minus');
var currency = require('../../public/scripts/function/currency');

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
 * 根据产品ids获取产品信息 
 */
exports.listByids = function* () {

	var products = this.request.body.products;
	var pids = [];
	var ps = [];
	products.forEach((item)=> {
		if (pids.indexOf(item.id) == -1) {
			pids.push(item.id);
			ps.push(item);
		} else {
			// 有重复的商品，有重复的合并一下
			ps.some((product)=> {
				if (product.id == item.id) {
					product.count += item.count;
					return true;
				}
			});
		}
	});
	var list = yield this.service.product.listByIds(pids);
	var result = [];
	// 把用户购买的数量回填上
	list.forEach((item) => {
		item = item.toJSON();
		var count = 1;
		ps.some((buyItem)=> {
			if (item._id == buyItem.id) {
				count = buyItem.count;
				return true;
			}
		});
		var payPrice = minus(item.price, item.discountPrice || 0);
		item.payPrice = payPrice;
		item.priceStr = currency(payPrice);
		item.count = count;
    	result.push(item);
	});

	this.body = this.helper.success({
		list: result
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
			productSubject: query.productSubjectId,
			price: query.price,
			storeCount: query.storeCount,
        	specifications: query.specifications,
			customField: query.customField,
			discountPrice: query.discountPrice
		};
	}	
	var result = yield this.service.product.put(id, update);
	this.body = this.helper.success(result);
};


