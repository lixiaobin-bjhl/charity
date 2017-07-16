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



