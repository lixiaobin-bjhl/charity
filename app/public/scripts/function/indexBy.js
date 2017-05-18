/**
 * @fileOverview chairty-function-indexBy
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports =  function indexBy (array, key) {
    var map = {};
    array.forEach(function (item, index) {
        map[item[key]] = item;
    });
    return map;
}