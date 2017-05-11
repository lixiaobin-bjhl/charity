/**
 * @fileOverview charity-cms-role request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加角色 
 */
export function add (params) {
    return post('/api/role', {
        title: params.title,
		summary: params.summary,
		storageId: params.storageId,
		roleSubjectId: params.roleSubjectId,
		price: params.price,
		discountPrice: params.discountPrice
    });
}

/**
 * 获取角色列表
 * @param {string=} params.roleSubjectId 角色分类id
 * @param {string=} params.key 角色搜索关键字
 */
export function list (params = {}) {
    return get('/api/role', {
        roleSubjectId: params.roleSubjectId,
        key: params.key.trim()
    });
}

/**
 * 删除角色
 * @param {string} id 角色id
 */
export function remove (id) {
    return del('/api/role/' + id);
}

/**
 * 批量删除角色
 * @param {string} ids 角色ids
 */
export function batchRemove (ids) {
    return del('/api/role/0', {
        ids: ids.map((item)=> {
            return item._id
        }).join(',')
    });
}

/**
 * 更新角色
 * @param {string} id 角色id
 * @param {string} params.title 角色名称
 * @param {string} params.summary 角色摘要
 */
export function update (id, params) {
    return put('/api/role/' + id, params);
}

/**
 * 查看角色详情
 * @param {string} id 角色id
 */
export function show (id) {
    return get('/api/role/' + id);
}

/** 
 * 获取上传角色token 
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


