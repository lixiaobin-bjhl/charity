

'use strict';

module.exports = {
    account: {
        id: 1,
        name: "用户管理",
        children: [
            {
                name: '用户列表',
                id: 1
            },
            {
                name: '增加用户',
                id: 2
            },
            {
                name: '编辑用户',
                id: 3
            },
            {
                name: '删除用户',
                id: 4
            }
        ]
    },
    product: {
        id: 2,
        name: "产品管理",
        children: [
            {
                name: '产品列表',
                id: 1
            },
            {
                name: '增加产品',
                id: 2
            },
            {
                name: '编辑产品',
                id: 3
            },
            {
                name: '删除产品',
                id: 4
            }
        ]
    },
    news: {
        id: 3,
        name: "新闻管理",
        children: [
            {
                name: '新闻列表',
                id: 1
            },
            {
                name: '增加新闻',
                id: 2
            },
            {
                name: '编辑新闻',
                id: 3
            },
            {
                name: '删除新闻',
                id: 4
            }
        ]
    },
    newsSubject: {
        id: 4,
        name: "新闻分类管理",
        children: [
            {
                name: '新闻分类列表',
                id: 1
            },
            {
                name: '增加新闻分类',
                id: 2
            },
            {
                name: '编辑新闻分类',
                id: 3
            },
            {
                name: '删除新闻分类',
                id: 4
            }
        ]
    },
    productSubject: {
        id: 5,
        name: "产品分类管理",
        children: [
            {
                name: '产品分类列表',
                id: 1
            },
            {
                name: '增加产品分类',
                id: 2
            },
            {
                name: '编辑产品分类',
                id: 3
            },
            {
                name: '删除产品分类',
                id: 4
            }
        ]
    },
    role: {
        id: 6,
        name: "角色管理",
        children: [
            {
                name: '角色列表',
                id: 1
            },
            {
                name: '增加角色',
                id: 2
            },
            {
                name: '编辑角色',
                id: 3
            },
            {
                name: '删除角色',
                id: 4
            }
        ]
    },
    customField: {
        id: 7,
        name: "自定义字段管理",
        children: [
            {
                name: '自定义字段列表',
                id: 1
            },
            {
                name: '增加自定义字段',
                id: 2
            },
            {
                name: '编辑自定义字段',
                id: 3
            },
            {
                name: '删除自定义字段',
                id: 4
            }
        ]
    }
}