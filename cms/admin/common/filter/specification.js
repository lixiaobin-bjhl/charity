/**
 * @file Vue-filter-specification
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import productConfig  from '../../modules/product/config';
import indexBy from '../../../../app/public/scripts/function/indexBy';
import Vue from 'vue';

/**
 * 根据规格id，找到规格名称 
 */
Vue.filter('specification', function (id) {

    var obj = indexBy(productConfig.specificationOption, 'id');
    return obj[id].name;
});