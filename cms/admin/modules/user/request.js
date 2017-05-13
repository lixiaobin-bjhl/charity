/**
 * @fileOverview charity-cms-user request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加产品 
 */
export function add (params) {
    return post('/api/user', {
        name: params.name,
		remark: params.remark,
		headPic: params.headPic,
		roleId: params.roleId,
		mobile: params.mobile,
		password: params.password
    });
}

/**
 * 获取产品列表
 * @param {string=} params.userSubjectId 产品分类id
 * @param {string=} params.key 产品搜索关键字
 */
export function list (params = {}) {
    return get('/api/user', {
        userSubjectId: params.userSubjectId,
        key: params.key.trim()
    });
}

/**
 * 删除产品
 * @param {string} id 产品id
 */
export function remove (id) {
    return del('/api/user/' + id);
}

/**
 * 批量删除产品
 * @param {string} ids 产品ids
 */
export function batchRemove (ids) {
    return del('/api/user/0', {
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
    return put('/api/user/' + id, params);
}

/**
 * 查看产品详情
 * @param {string} id 产品id
 */
export function show (id) {
    return get('/api/user/' + id);
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


