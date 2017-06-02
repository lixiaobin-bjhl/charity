
'use strict';

var webpack = require('webpack')
var ora = require('ora')
var spinner = ora('building for production...')
spinner.start() 

var webpackConfig = require('./webpack.config.prod');

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})