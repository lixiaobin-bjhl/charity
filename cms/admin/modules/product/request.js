/**
 * @fileOverview charity-cms-product request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加新闻 
 */
export function add (params) {
    return post('/api/product', {
        title: params.title,
        summary: params.summary,
        content: params.content,
        newsSubjectId: params.newsSubjectId
    });
}

/**
 * 添加新闻
 */
export function list (params = {}) {
    return get('/api/product', {
        newsSubjectId: params.newsSubjectId
    });
}

/**
 * 删除新闻
 * @param {string} id 新闻id
 */
export function remove (id) {
    return del('/api/product/' + id);
}

/**
 * 批量删除新闻
 * @param {string} ids 新闻ids
 */
export function batchRemove (ids) {
    return del('/api/product/0', {
        ids: ids.map((item)=> {
            return item._id
        }).join(',')
    });
}

/**
 * 更新新闻
 * @param {string} id 新闻id
 * @param {string} params.name 分类名称
 * @param {string} params.remark 分类备注
 */
export function update (id, params) {
    return put('/api/product/' + id, params);
}


