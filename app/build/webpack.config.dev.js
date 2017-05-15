
'use strict';

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.base');
var webpack = require('webpack');

var plugins = [
    new webpack.NoErrorsPlugin()
];

module.exports = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: plugins
});