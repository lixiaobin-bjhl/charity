'use strict';

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1491043715892_8663';
    config.middleware = [
        'responseTime',
        'webpack'
    ];
    config.view = {
        mapping: {
            '.ejs': 'ejs'
        }
    };
    config.ejs = {};
    return config;
};
