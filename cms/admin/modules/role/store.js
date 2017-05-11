/**
 * @fileOverview charity-cms-role store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    role: null,
    showDetailState: false
};

const mutations = {
    'SET_ROLE' (state, role) {
        state.role = role;
    },
    'RESET_ROLE' (state) {
        state.role = null;
    },
    'SHOW_ROLE_DETAIL' (state, role) {
        state.showDetailState = true;
        state.role = role;
    },
    'HIDE_ROLE_DETAIL' (state) {
        state.showDetailState = false;
        state.role = null;
    }
};

export default {
    state,
    mutations
};