/**
 * @fileOverview charity-message-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var request = require('request');
var Promise = require("bluebird");

/**
 * 发送信息
 */
exports.create = function* () {
	var query =  this.request.body;
	var token = yield this.service.tool.getAccessToken(query.appId, query.appSecret);
	var result = yield this.service.message.send({
		token,
		touser: query.touser,
		templateId: query.templateId,
		data: query.data,
		formId: query.formId
	});
	this.body = this.helper.success(result);
};