'use strict';

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1491043715892_8663';

    config.middleware = [
        'isAdmin',
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

    exports.proxyworker = {
        port: 10086
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/charity',
        options: {
            promiseLibrary: require('bluebird')
        }
    };

    return config;
};
