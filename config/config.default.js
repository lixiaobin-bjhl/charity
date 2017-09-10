'use strict';

var modules = require('./modules');
const path = require('path');

module.exports = appInfo => {
    const config = {};
    var env = process.env.NODE_ENV;
    var viewPath = env === 'production' ? 'dist/view' : 'app/view';
    console.log(appInfo.baseDir);
    var staticPath = env === 'production' ? 'dist/public' : 'app/public';

    // should change to your own
    config.keys = appInfo.name + '_1491043715892_8663';

    config.env = env === 'production' ? 'prod' : 'local';

    config.view = {
        root: [
            path.join(appInfo.baseDir, viewPath),
        ].join(','),
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks'
        }
    };

    config.static = {
        dir: path.join(appInfo.baseDir, staticPath)
    };

    config.security = {
        csrf: {
            ignore: (ctx) => {
                if (ctx.request.url.indexOf('purchase/notice')) {
                    return true;
                }
            },
            // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
            ignoreJSON: true 
        }
    };

    config.proxyworker = {
        port: 10086
    };

    config.bodyParser = {
        ignore: /notice/
    };

    config.cluster = {
        baseDir: __dirname,
        https: true,
        workers: 1,
        key: '../wx.56xg.com/private.key',
        cert: '../wx.56xg.com/server.pem'
    }

    config.pageDto = {
        pageNum: 1,
        pageSize: 20
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/charity',
        options: {
            promiseLibrary: require('bluebird'),
            auto_reconnect: true,
            poolSize: 10
        }
    };
    config.modules = modules;

    return config;
};
