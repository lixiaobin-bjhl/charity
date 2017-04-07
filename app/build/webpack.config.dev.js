
'use strict';

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.base');
var plugins = [];

module.exports = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: plugins
});