/**
 * @fileOverview charity-cms-main cms登录
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import Vue from 'vue';
import app from './login/app.vue';

new Vue({
   render: h => h(app)
})
.$mount('#main');