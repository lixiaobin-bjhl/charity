'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'vue', 'vuex', 'vue-router', 'element-ui', 'axios'
        ]
    },
    output: {
        path: path.join(__dirname, './app/public/scripts/'),
        filename: '[name].dll.js',
        //定义输出：window.${output.library}
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
          path: path.join(__dirname, './app/public/scripts/', '[name]-manifest.json'),
          // 和 output.library 一样即可
          name: '[name]_library'
      })
    ]
}
