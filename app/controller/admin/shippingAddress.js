/**
 * @fileOverview charity-shipping-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加收货地址
 */
exports.create = function* () {
    var query = this.request.body;
	var shippingAddress = yield this.service.shippingAddress.add(query);
	
	this.body = this.helper.success({
		shippingAddress	
	});
};


/**
 * 获取收货地址列表
 */
exports.index = function* () {
    var query = this.query;
	var list = yield this.service.shippingAddress.list(query);
	this.body = this.helper.success(list);
};

/**
 * 根据openid 找查收货地址信息
 */
exports.listByOpenid = function* () {
    var openid = this.request.body.openid;
    var list = yield this.service.shippingAddress.listByOpenid(openid);
    this.body = this.helper.success(list);
};

/**
 * 查看地址详情
 */
exports.show = function* () {
	var id = this.params.id;
	var shippingAddress = yield this.service.shippingAddress.findById(id);
    this.body = this.helper.success(shippingAddress);
    
};

/**
 * 删除配送地址
 */
exports.destroy = function* () {
	var id = this.params.id;
	var shippingAddress = yield this.service.shippingAddress.del(id);
	this.body = this.helper.success({
		shippingAddress	
	});
};

/**
 * 编辑配送地址
 */
exports.update = function* () {
	var id = this.params.id;
    var query = this.request.body;
    var update = {
		updateTime: new Date()
    }

    if (query.name) {
        Object.assign(update, {
            name: query.name,
            contactNumber: query.contactNumber,
            address: query.address,
            region: query.region
        });
    } else {
        Object.assign(update, {
            isDefault: query.isDefault
        });
    }
	var result = yield this.service.shippingAddress.put(id, update);
	this.body = this.helper.success(result);
};

