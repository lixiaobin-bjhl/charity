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
import productSubject from '../modules/productSubject/store';
import account from '../modules/account/store';
import role from '../modules/role/store';
import customField from '../modules/customField/store';

export default new vuex.Store({
    state: {
		breadCrumbs: [],
		loadingProgressState: false
	},
    strict: false,
	mutations,
	actions,
	modules: {
		news,
		newsSubject,
		product,
		role,
		account,
		productSubject,
		customField
	}
});

