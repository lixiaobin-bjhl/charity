/**
 * @fileOverview charity-cms-user store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    user: null,
    showDetailState: false
};

const mutations = {
    'SET_USER' (state, user) {
        state.user = user;
    },
    'RESET_USER' (state) {
        state.user = null;
    },
    'SHOW_USER_DETAIL' (state, user) {
        state.showDetailState = true;
        state.user = user;
    },
    'HIDE_USER_DETAIL' (state) {
        state.showDetailState = false;
        state.user = null;
    }
};

export default {
    state,
    mutations
};