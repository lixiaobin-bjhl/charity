/**
 * @fileOverview charity-cms-routes
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default [
    {
        path: '/admin',
        redirect: '/admin/home'
    },
    {
        path: '/admin/home',
        component: require('./modules/home/index.vue')
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
        path: '/admin/account',
        component: require('./modules/account/index.vue')
    },
    {
        path: '/admin/customField',
        component: require('./modules/customField/index.vue')
    },
    {
        path: '/admin/schema',
        component: require('./modules/schema/index.vue')
    },
    {
        path: '/admin/user',
        component: require('./modules/user/index.vue')
    },
    {
        path: '/admin/order',
        component: require('./modules/order/index.vue')
    },
    {
        path: '/admin/card',
        component: require('./modules/card/index.vue')
    },
    {
        path: '/admin/shippingAddress',
        component: require('./modules/shippingAddress/index.vue')
    }
];


