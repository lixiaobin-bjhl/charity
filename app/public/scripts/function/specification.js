/**
 * @file chairty-function-specification
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var productConfig = require('../../../../cms/admin/modules/product/config');
var indexBy = require('./indexBy');

/**
 * 根据规格名称找id 
 */
module.exports = function (id) {
    var obj = indexBy(productConfig.specificationOption, 'id');
    return obj[id].name;
}