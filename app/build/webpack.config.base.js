
'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var utils = require('./utils');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'vue', 'vuex', 'vue-router', 'element-ui', 'axios'
        ],
        cvendor: [
            'jquery', 'amazeui', 'axios'
        ],
        'public/scripts/home': './app/public/scripts/home.js',
        'public/scripts/news': './app/public/scripts/news.js',
        'public/scripts/join': './app/public/scripts/join.js',
        'public/scripts/team': './app/public/scripts/team.js',
        'public/scripts/about': './app/public/scripts/about.js',
        'public/scripts/case': './app/public/scripts/case.js',
        'public/scripts/contact': './app/public/scripts/contact.js',
        'public/scripts/product': './app/public/scripts/product.js',
        'public/scripts/solution': './app/public/scripts/solution.js',
        'public/scripts/main': './cms/admin/main.js',
        'public/scripts/cmsLogin': './cms/admin/login.js',
        'public/scripts/common': './app/public/scripts/common.js',
        'public/scripts/ccommon': './app/public/scripts/ccommon.js'
    },
    resolve:{
        extensions:[".vue", ".js"],
        modules: [path.join(__dirname, '../../node_modules')]
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
                options: {
                    loaders: {
                        scss: 'style-loader!css-loader!sass-loader'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
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
         new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
            disable: false 
         })
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
