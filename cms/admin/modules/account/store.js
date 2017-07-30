/**
 * @fileOverview charity-cms-account store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    account: null,
    showDetailState: false
};

const mutations = {
    'SET_ACCOUNT' (state, account) {
        state.account = account;
    },
    'RESET_ACCOUNT' (state) {
        state.account = null;
    },
    'SHOW_ACCOUNT_DETAIL' (state, account) {
        state.showDetailState = true;
        state.account = account;
    },
    'HIDE_ACCOUNT_DETAIL' (state) {
        state.showDetailState = false;
        state.account = null;
    }
};

export default {
    state,
    mutations
};