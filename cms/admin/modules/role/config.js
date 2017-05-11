/**
 * @fileOverview charity-cms-role config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default  {
    addFormRule: {
        title: {
            required: true,
            message: '请输入角色标题'
        },
        summary: {
            required: true,
            message: '请输入角色摘要'
        },
        roleSubjectId: {
            required: true,
            message: '请选择角色分类'
        },
        content: {
            required: true,
            message: '请输入角色内容'
        },
        storageId: {
            required: true,
            message: '请上传角色图片'
        },
        price: {
            required: true,
            message: '请输入角色价格'
        }
    }
}