/**
 * @fileOverview charity-cms-product request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加产品 
 */
export function add (params) {
    return post('/api/product', {
        title: params.title,
		summary: params.summary,
		storageId: params.storageId,
		productSubjectId: params.productSubjectId,
		price: params.price,
		discountPrice: params.discountPrice
    });
}

/**
 * 获取产品列表
 * @param {string=} params.productSubjectId 产品分类id
 * @param {string=} params.key 产品搜索关键字
 */
export function list (params = {}) {
    return get('/api/product', {
        productSubjectId: params.productSubjectId,
        key: params.key.trim()
    });
}

/**
 * 删除产品
 * @param {string} id 产品id
 */
export function remove (id) {
    return del('/api/product/' + id);
}

/**
 * 批量删除产品
 * @param {string} ids 产品ids
 */
export function batchRemove (ids) {
    return del('/api/product/0', {
        ids: ids.map((item)=> {
            return item._id
        }).join(',')
    });
}

/**
 * 更新产品
 * @param {string} id 产品id
 * @param {string} params.title 产品名称
 * @param {string} params.summary 产品摘要
 */
export function update (id, params) {
    return put('/api/product/' + id, params);
}

/** 
 * 获取上传产品token 
 */
export function uptoken () {
    return get('/qiniu/uptoken');
}

/**
 * 上传图片
 * @param {string} params.token 上传token
 * @param {Object} params.file 上传图片本身
 */
export function upload (params) {
    return post('http://up-z2.qiniu.com', params)
}


