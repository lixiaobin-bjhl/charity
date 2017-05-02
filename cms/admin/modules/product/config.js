/**
 * @fileOverview charity-cms-product config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default  {
    addFormRule: {
        title: {
            required: true,
            message: '请输入新闻标题'
        },
        summary: {
            required: true,
            message: '请输入新闻摘要'
        },
        newsSubjectId: {
            required: true,
            message: '请选择新闻分类'
        },
        content: {
            required: true,
            message: '请输入新闻内容'
        }
    }
}