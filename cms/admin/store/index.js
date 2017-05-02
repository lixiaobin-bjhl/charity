/**
 * @fileOverview charity-cms-store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import actions from './action';
import mutations from './mutations';
import vuex from 'vuex';
import Vue from 'vue'; 

Vue.use(vuex);

import newsSubject from '../modules/newsSubject/store';
import news from '../modules/news/store';
import product from '../modules/product/store';

export default new vuex.Store({
    state: {
		breadCrumbs: []
	},
    strict: false,
	mutations,
	actions,
	modules: {
		newsSubject,
		news
	}
});
