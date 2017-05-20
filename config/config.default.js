'use strict';

var modules = require('./modules');

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1491043715892_8663';

    config.middleware = [
        'isAdmin',
        'accessPermission',
        'gzip',
        'responseTime',
        'webpack'
    ];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks'
        }
    };

    config.security = {
        csrf: {
            // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
            ignoreJSON: true 
        }
    };

    config.proxyworker = {
        port: 10086
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/charity',
        options: {
            promiseLibrary: require('bluebird')
        }
    };
    config.modules = modules;

    return config;
};
