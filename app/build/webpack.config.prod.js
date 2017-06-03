
'use strict';

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.base');
var webpack = require('webpack');
var path = require('path');
let os = require('os');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let WebpackMd5Hash = require('webpack-md5-hash');
let CompressionPlugin = require("compression-webpack-plugin");
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

var plugins = [
    new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname, '../../'),
        verbose: true,
        dry: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            },
            chunks: ["public/scripts/main"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'cvendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            },
            chunks: ["public/scripts/home"]
        }),
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html|less)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new ParallelUglifyPlugin({
        workerCount: os.cpus().length,
        cacheDir: '.cache/',
        uglifyJS: {
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            comments: false,
            sourceMap: false,
            mangle: true
        }
    })
];

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../../dist/'),
        publicPath: '/',
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    // devtool: 'source-map',
    plugins: plugins
});