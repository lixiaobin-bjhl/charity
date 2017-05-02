/**
 * @fileOverview charity-cms-左导配置 
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default [
    {
        name: '内容管理',
        icon: 'el-icon-message',
        url: '/admin/news',
        children: [
            {
                name: '新闻管理',
                url: '/admin/news'
            },
            {
                name: '产品中心',
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
                url: '/admin/newsSubject'
            },
            {
                name: '产品分类',
                url: '/admin/productSubject'
            }
        ]
    }
];
