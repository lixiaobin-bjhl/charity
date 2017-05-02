/**
 * @fileOverview charity-cms-product store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    product: null
};

const mutations = {
    'SET_PRODUCT' (state, subject) {
        state.product = subject;
    },
    'RESET_PRODUCT' (state) {
        state.product = null;
    }
};

export default {
    state,
    mutations
};