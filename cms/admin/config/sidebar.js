/**
 * @fileOverview charity-cms-左导配置 
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default [
    {
        name: '首页',
        icon: 'el-icon-message',
        url: '/admin/home',
    },
    {
        name: '内容管理',
        icon: 'el-icon-message',
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
                name: '客户案例',
                url: '/admin/case'
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
                name: '角色管理',
                number: 6,
                url: '/admin/role'
            },
            {
                name: '用户管理',
                number: 1,
                url: '/admin/user'
            }
        ]
    }
];
