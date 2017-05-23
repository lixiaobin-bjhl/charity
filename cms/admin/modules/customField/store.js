/**
 * @fileOverview charity-cms-customField store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    customField: null
};

const mutations = {
    'SET_CUSTOM_FIELD' (state, customField) {
        state.customField = customField;
    },
    'RESET_CUSTOM_FIELD' (state, customField) {
        state.customField = null;
    }
};

export default {
    state,
    mutations
};