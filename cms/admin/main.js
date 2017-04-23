/**
 * @fileOverview charity-cms-main cms入口
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import Vue from 'vue';
import app from './app.vue';
import Element from 'element-ui'

Vue.use(Element);

new Vue({
   render: h => h(app)
})
.$mount('#main');