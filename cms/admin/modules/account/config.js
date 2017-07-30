/**
 * @fileOverview charity-cms-account config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default  {
    addFormRule: {
        name: [
            {
                required: true,
                message: '请输入用户姓名'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入用户姓名'
            }
        ],
        roleId: [
            {
                required: true,
                message: '请选择所属角色'
            }
        ],
        type: [
            {
                required: true,
                type: 'number',
                message: '请选择账号类型'
            }
        ],
        masterMobile: [
            {
                required: true,
                message: '请输入主账号手机'
            },
            {
                pattern: /^1\d{10}$/,
                message: '请输入正确的11位手机号',
                trigger: 'blur'
            }
        ],
        mobile: [
            {
                required: true,
                message: '请输入手机号'
            },
            {
                pattern: /^1\d{10}$/,
                message: '请输入正确的11位手机号',
                trigger: 'blur'
            }
	    ]
    },
    accountTypeOption: [
        {
            id: 0,
            name: '超级用户'
        },
        {
            id: 1,
            name: '公司主账号'
        },
        {
            id: 2,
            name: '公司子账号'
        }
    ]
}