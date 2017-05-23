/**
 * @fileOverview charity-cms-customField config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = {
    addFormRule: {
        name: {
            required: true,
            message: '请输入自定义字段名称'
        },
        type: {
            required: true,
            type: 'number',
            message: '请选择字段类型'
        }
    },
    typeOption: [
        {
            id: 0,
            name: '文本'
        },
        {
            id: 1,
            name: '下拉单选'
        }
    ]
};