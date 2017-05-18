/**
 * @file Vue-filter-specification
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import specification from '../../../../app/public/scripts/function/specification';
import Vue from 'vue';

/**
 * 根据规格id，找到规格名称 
 */
Vue.filter('specification', function (id) {
    return specification(id);
});