/**
 * @fileOverview charity-cms-user config
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
    }
}