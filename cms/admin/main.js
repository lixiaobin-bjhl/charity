/**
 * @fileOverview charity-cms-main cms入口
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import Vue from 'vue';
import app from './app.vue';
import Element from 'element-ui';
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store/index';

window.store = store;

import {
    Message
} from 'element-ui';

// filter
require('./common/filter/date');
require('./common/filter/currency');
require('./common/filter/compressImage');
require('./common/filter/unitMoney');
require('./common/filter/specification');


Vue.component('pager', require('./common/components/Pager'));

import auth from './common/plugin/auth';

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    var path = from.path;
    var fullPath = to.fullPath;
    store.dispatch('updateBreadcrumb', fullPath);
    next();
    
    if (path) {
        // 两个/之间的就是模块名称
        var moduleNames = /([^\/]+)/.exec(path);
        if (moduleNames && moduleNames[1]) {
            clearState(moduleNames[1]);
        }
    }
});

/**
 * 路由变化时，把之前的弹窗状态都清掉
 */
function clearState(module) {
    var state = store.state;
    // 清除所有模块的state 为ture 置为false
    if (module === 'all') {
        for (var key in state) {
            var module = state[key];
            if (typeof module  === 'object') {
                for (var key2 in module) {
                    var property = module[key2];
                    if (module.hasOwnProperty(key2) && property && typeof property === 'boolean') {
                        module[key2] = false;
                    }
                } 
            }
        }
    }

    else if (status) {
        var status = state[module];
        for (var key in status) {
            var property = status[key];
            if (status.hasOwnProperty(key) && property && typeof property === 'boolean') {
                status[key] = false;
            }
        }
    }
    $('body').css({
        overflow: ''
    });
}

window.clearState = clearState;
Vue.use(Element);
Vue.use(VueRouter);
Vue.use(auth);

window.toast = function(msg, type) {
    var type = type || 'warning';
    Message({
        type: type,
        message: msg
    });
}

new Vue({
    router,
    store,
    render: h => h(app)
})
.$mount('#app');