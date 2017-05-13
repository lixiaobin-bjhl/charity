/**
 * @fileOverview charity-cms-role config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default  {
    addFormRule: {
        name: {
            required: true,
            message: '请输入角色名称'
        },
        authority: {
            validator (rule, value, callback) {
                if (!value) {
                     callback(new Error('请选择权限'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    }
}