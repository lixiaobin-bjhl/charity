
'use strict';

var path = require('path');

module.exports = {
    entry: {
       'public/scripts/home': './app/public/scripts/home.js',
       'public/scripts/main': './cms/admin/main.js'
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
            }
        ]
    }
};
