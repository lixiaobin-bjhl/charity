/**
 * @fileOverview charity-cms-左导配置 
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default [
    {
        name: '首页',
        icon: 'icon-home',
        url: '/admin/home',
    },
    {
        name: '内容管理',
        icon: 'icon-content',
        url: '/admin/news',
        children: [
            {
                name: '新闻管理',
                number: 3,
                url: '/admin/news'
            },
            {
                name: '产品管理',
                number: 2,
                url: '/admin/product'
            },
            {
                name: '订单管理',
                number: 12,
                url: '/admin/order'
            },
            {
                name: '购物车管理',
                number: 9,
                url: '/admin/card'
            },
            {
                name: '用户管理',
                number: 8,
                url: '/admin/user'
            },
            {
                name: '客户案例',
                url: '/admin/case'
            },
            {
                name: '收货地址管理',
                number: 11,
                url: '/admin/shippingAddress'
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'el-icon-setting',
        url: '/admin/newsSubject',
        children: [
            {
                name: '新闻分类',
                number: 4,
                url: '/admin/newsSubject'
            },
            {
                name: '产品分类',
                number: 5,
                url: '/admin/productSubject'
            },
            {
                name: '产品自定义字段',
                number: 7,
                url: '/admin/customField'
            },
            {
                name: '模板中心',
                number: 13,
                url: '/admin/schema'
            },
            {
                name: '角色管理',
                number: 6,
                url: '/admin/role'
            },
            {
                name: '帐号管理',
                number: 1,
                url: '/admin/account'
            }
        ]
    }
];
