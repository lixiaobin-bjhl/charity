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
    'SET_ROLE' (state, user) {
        state.user = user;
    },
    'RESET_ROLE' (state) {
        state.user = null;
    },
    'SHOW_ROLE_DETAIL' (state, user) {
        state.showDetailState = true;
        state.user = user;
    },
    'HIDE_ROLE_DETAIL' (state) {
        state.showDetailState = false;
        state.user = null;
    }
};

export default {
    state,
    mutations
};