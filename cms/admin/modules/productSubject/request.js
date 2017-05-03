/**
 * @fileOverview charity-cms-productSubject request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加产品分类 
 */
export function add (params) {
    return post('/api/productSubject', {
        name: params.name,
        remark: params.remark
    });
}

/**
 * 添加产品分类
 */
export function list (params) {
    return get('/api/productSubject');
}

/**
 * 删除产品分类
 * @param {string} id 产品分类id
 */
export function remove (id) {
    return del('/api/productSubject/' + id);
}

/**
 * 更新产品分类
 * @param {string} id 产品分类id
 * @param {string} params.name 分类名称
 * @param {string} params.remark 分类备注
 */
export function update (id, params) {
    return put('/api/productSubject/' + id, params);
}


