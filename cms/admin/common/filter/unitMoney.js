/**
 * @fileOverview 服务端金钱常以分作为单位，所以在展示的时候，需要转化为元
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */


'use strict';

import divide from '../../../../app/public/scripts/function/divide'
import Vue from 'vue'

/**
 * 金额（分）除以100
 * @param {number} value
 */
Vue.filter('unitMoney', function(value) {
	if (value > 0) {
		return divide(value, 100);
	}
	return 0;
});