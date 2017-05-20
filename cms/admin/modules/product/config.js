/**
 * @fileOverview charity-cms-product config
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports =  {
    addFormRule: {
        title: {
            required: true,
            message: '请输入产品标题'
        },
        productSubjectId: {
            required: true,
            message: '请选择产品分类'
        },
        content: {
            required: true,
            message: '请输入产品内容'
        },
        storageIds: {
            required: true,
            message: '请上传产品图片'
        },
        price: {
            required: true,
            message: '请输入产品价格'
        },
        storeCount: {
            required: true,
            message: '请输入库存数'
        }
    },
    specificationOption: [
        {
            name: '尺码',
            id: 0
        },
        {
            name: '颜色',
            id: 1
        },
        {
            name: '口味',
            id: 2
        },
        {
            name: '容量',
            id: 3
        },
        {
            name: '套餐',
            id: 4
        },
        {
            name: '种类',
            id: 5
        },
        {
            name: '尺寸',
            id: 6
        },
        {
            name: '重量',
            id: 7
        },
        {
            name: '净重',
            id: 8
        },
        {
            name: '型号',
            id: 9
        },
        {
            name: '款式',
            id: 10
        }
    ]
}