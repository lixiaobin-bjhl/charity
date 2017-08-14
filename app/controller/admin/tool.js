/**
 * @fileOverview charity-tool-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

/**
 * 获取access token
 */
exports.getAccessToken = function* (appId, appSecret) {
    var query = this.ctx.request.body;
    var result = yield this.service.tool.getAccessToken(query.appId, query.appSecret);
    this.body = result;
};