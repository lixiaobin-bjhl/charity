/**
 * @file nunjucks 过滤器
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */


'use strict';

var compressImage = require('../public/scripts/function/compressImage');

exports.compressImage = (storageId, width, height) => {
    return compressImage(storageId, {
        width: width,
        height: height
    });
}