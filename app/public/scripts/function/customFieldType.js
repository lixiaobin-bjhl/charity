/**
 * @file chairty-function-customField
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var customFieldConfig = require('../../../../cms/admin/modules/customField/config');
var indexBy = require('./indexBy');

/**
 * 根据自定义分类id查找自分定义分类名称 
 */
module.exports = function (id) {
    var obj = indexBy(customFieldConfig.typeOption, 'id');
    var item = obj[id];
    
    if (item) {
        return item.name;
    }
    return '';
}