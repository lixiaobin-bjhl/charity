

'use strict';

module.exports = {
    account: {
        id: 1,
        name: "帐户管理",
        children: [
            {
                name: '帐户列表',
                id: 1
            },
            {
                name: '增加帐户',
                id: 2
            },
            {
                name: '编辑帐户',
                id: 3
            },
            {
                name: '删除帐户',
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
    },
    user: {
        id: 8,
        name: "用户信息",
        children: [
            {
                name: '用户列表',
                id: 1
            }
        ]
    },
    card: {
        id: 9,
        name: "购物车管理",
        children: [
            {
                name: '购物车列表',
                id: 1
            }
        ]
    },
    shippingAddress: {
        id: 11,
        name: "收货地址管理",
        children: [
            {
                name: '收货地址列表',
                id: 1
            }
        ]
    },
    order: {
        id: 12,
        name: "订单管理",
        children: [
            {
                name: '订单列表',
                id: 1
            }
        ]
    },
    schema: {
        id: 13,
        name: "模板中心",
        children: [
            {
                name: '模板中心列表',
                id: 1
            }
        ]
    }
}