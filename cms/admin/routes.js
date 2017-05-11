/**
 * @fileOverview charity-cms-routes
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default [
    {
        path: '/admin',
        redirect: '/admin/news'
    },
    {
        path: '/admin/news',
        component: require('./modules/news/index.vue')
    },
    {
        path: '/admin/product',
        component: require('./modules/product/index.vue')
    },
    {
        path: '/admin/case',
        component: require('./modules/case/index.vue')
    },
    {
        path: '/admin/newsSubject',
        component: require('./modules/newsSubject/index.vue')
    },
    {
        path: '/admin/productSubject',
        component: require('./modules/productSubject/index.vue')
    },
    {
        path: '/admin/role',
        component: require('./modules/role/index.vue')
    },
    {
        path: '/admin/user',
        component: require('./modules/user/index.vue')
    }
];


