/**
 * @file nunjucks 过滤器
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var compressImage = require('../public/scripts/function/compressImage');
var Nunjucks = require('Nunjucks');

/**
 * 压缩图片 
 * @property {string} storageId 七牛云存储key
 * @property {number} options.width 显示宽度
 * @property {number} options.height 显示高度
 * @return {string} 压缩后的图片地址
 */
exports.compressImage = (storageId, width, height) => {
    return compressImage(storageId, {
        width: width,
        height: height
    });
}
