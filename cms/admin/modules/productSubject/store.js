/**
 * @fileOverview charity-cms-productSubject store
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

const state = {
    subject: null
};

const mutations = {
    'SET_SUBJECT' (state, subject) {
        state.subject = subject;
    },
    'RESET_SUBJECT' (state) {
        state.subject = null;
    }
};

export default {
    state,
    mutations
};