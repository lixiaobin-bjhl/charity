/**
 * @fileOverview charity 权限
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

import modules from '../../../../config/modules';

export default {

	install (Vue) {
		/**
		 * 判读模块是否有某个功能权限
		 * @param {string} moduleName 模块Number 详细见/config/module.js
		 * @param {string} funNum 1列表 2增加 3 编辑 4删除
		 * @return {Boolean} 是否具有该权限
		 */
		Vue.prototype.hasAuth = function (moduleNumber, funNum) {
			return window.authority[moduleNumber] & funNum;
		}
	}
}