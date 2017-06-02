
'use strict';

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.base');
var webpack = require('webpack');
var path = require('path');

var plugins = [
    new webpack.NoErrorsPlugin()
];


module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../public/scripts/'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    devtool: '#eval-source-map',
    plugins: plugins
});