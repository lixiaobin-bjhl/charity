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

import {
    Message
} from 'element-ui';


// filter
require('./common/filter/date');
require('./common/filter/currency');
require('./common/filter/compressImage');

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
    // var status = store.state[module];
    // if (status) {
    //     for (var key in status) {
    //         var property = status[key];
    //         if (status.hasOwnProperty(key) && property && typeof property === 'boolean') {
    //             status[key] = false;
    //         }
    //     }
    // }
    $('body').css({
        overflow: ''
    });
}

Vue.use(Element);
Vue.use(VueRouter);

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