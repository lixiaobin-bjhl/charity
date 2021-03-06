/**
 * @fileOverview charity-cms-store-mutation
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default {
    // 更新面包屑
	'UPDATE_BREADCRUMB' (state, breadCrumbs) {
		state.breadCrumbs = breadCrumbs;
	},
	'SHOW_LOADING_PREGROESS' (state) {
		state.loadingProgressState = true;
	},
	'HIDE_LOADING_PREGROESS' (state) {
		state.loadingProgressState = false;
	}
};