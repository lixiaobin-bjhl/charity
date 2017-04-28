/**
 * @fileOverview charity-cms-news store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    news: null
};

const mutations = {
    'SET_NEWS' (state, subject) {
        state.news = subject;
    },
    'RESET_NEWS' (state) {
        state.news = null;
    }
};

export default {
    state,
    mutations
};