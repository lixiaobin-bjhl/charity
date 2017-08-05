/**
 * @fileOverview charity-card-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 添加到购物车 
 */
exports.create = function* () {
    var query = this.request.body;
    var card = yield this.service.card.add(query);
    
	this.body = this.helper.success({
		card	
    });
}

/**
 * 删除购物车信息 
 */
exports.destroy = function *() {
    var id = this.params.id;

    var card = yield this.service.card.del(id);
    
	this.body = this.helper.success({
		card	
	});
}


/**
 * 根据openid查找购物车 
 */
exports.getListByOpenid = function * () {
    var params = this.params;
    var opendid = params.id;

    var list = yield this.service.card.getListByOpenid(opendid);

    this.body = this.helper.success(list);
}

/**
 * 查找帐号购物车的数量
 */
exports.getCountByOpenid = function * () {
    var params = this.params;
    var opendid = params.id;

    var count = yield this.service.card.getCountByOpenid(opendid);

    this.body = this.helper.success({
        count
    });
}

/**
 * 把购物车中移除产品移除 
 */
exports.delByPids = function* () {
    var openid = this.params.openid;
	var query = this.request.body;
    var pids = query.pids;
	var result = yield this.service.card.delByPids(openid, pids);
	this.body = this.helper.success(result);
}




