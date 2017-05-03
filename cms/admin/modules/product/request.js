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
        content: params.content,
        productSubjectId: params.productSubjectId
    });
}

/**
 * 添加产品
 */
export function list (params = {}) {
    return get('/api/product', {
        productSubjectId: params.productSubjectId
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
 * 上传产品图片 
 */
export function uptoken () {
    return get('/qiniu/uptoken');
}


