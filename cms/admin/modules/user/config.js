/**
 * @fileOverview charity-cms-user config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default  {
    addFormRule: {
        title: {
            required: true,
            message: '请输入产品标题'
        },
        summary: {
            required: true,
            message: '请输入产品摘要'
        },
        userSubjectId: {
            required: true,
            message: '请选择产品分类'
        },
        content: {
            required: true,
            message: '请输入产品内容'
        },
        storageId: {
            required: true,
            message: '请上传产品图片'
        },
        price: {
            required: true,
            message: '请输入产品价格'
        }
    }
}