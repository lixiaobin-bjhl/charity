'use strict';

var Promise = require("bluebird");

module.exports = {
    getModel() {
        return this.app.model;
    },
    /**
     * 获取post流中的body数据
     * 
     * @param {Context} ctx
     * @return {Promise}
     */
    getPostStreamBody (ctx) {
        return new Promise(function (resolve, reject) {
            let arr = [];
            var req = ctx.req;
            req.on('data', data => arr.push(data));
            req.on('end', function() {
                const body = Buffer.concat(arr).toString();
                resolve(body);
            });
        });
    }
};
