
'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        'public/scripts/home': './app/public/scripts/home.js',
        'public/scripts/main': './cms/admin/main.js',
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
    ]
};
