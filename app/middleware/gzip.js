/**
 * @fileOverview charity-middleware-gzip
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = (options, app) => {
    return function* (next) { 
        yield next;
            // 后续中间件执行完成后将响应体转换成 gzip
            let body = this.body;
            if (!body) return;
            if (isJSON(body)) body = JSON.stringify(body);
            // 设置 gzip body，修正响应头
            const stream = zlib.createGzip();
            stream.end(body);
            this.body = stream;
            this.set('Content-Encoding', 'gzip');
    };
}