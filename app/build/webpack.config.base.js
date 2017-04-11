
'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var utils = require('./utils');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        'public/scripts/home': './app/public/scripts/home.js',
        'public/scripts/main': './cms/admin/main.js',
        'public/scripts/cmsLogin': './cms/admin/login.js',
        'public/scripts/vendor': './app/public/scripts/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, '../public/scripts/'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                // include: [path.resolve(__dirname, '../tianxiao-common-frontend/dep/element/')],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development 
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass
    ],
    // vue: {
    //     loaders: utils.cssLoaders(),
    //     postcss: [
    //         require('autoprefixer')({
    //             browsers: ['last 2 versions']
    //         })
    //     ]
    // }
};
