/**
 * @fileOverview charity-cms-product store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    product: null,
    showDetailState: false
};

const mutations = {
    'SET_PRODUCT' (state, product) {
        state.product = product;
    },
    'RESET_PRODUCT' (state) {
        state.product = null;
    },
    'SHOW_PRODUCT_DETAIL' (state, product) {
        state.showDetailState = true;
        state.product = product;
    },
    'HIDE_PRODUCT_DETAIL' (state) {
        state.showDetailState = false;
        state.product = null;
    }
};

export default {
    state,
    mutations
};