/**
 * @fileOverview charity-cms-store-action
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import sidebarConfig from '../config/sidebar';

export default {
    /**
	 * 更新导航
	 */
	updateBreadcrumb ({ commit, state }, fullPath) {
		var paths = fullPath.split('/');
		var breadcrumb = [];
		sidebarConfig.some((level1) => {
			var children = level1.children;
			if (children && children.length) {
				children.some((level2) => {
					if (level2.url == fullPath) {
						// 二级面包屑
						breadcrumb.push({
							name: level2.name,
							url: fullPath
						});
						breadcrumb.unshift({
							name: level1.name,
							url: level1.url
						});
						return true;
					}
				});
			}
		});
		commit('UPDATE_BREADCRUMB', breadcrumb);
	}
}