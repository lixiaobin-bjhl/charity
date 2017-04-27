/**
 * @fileOverview charity-cms-news request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加新闻 
 */
export function add (params) {
    return post('/api/news', {
        name: params.name,
        remark: params.remark
    });
}

/**
 * 添加新闻
 */
export function list (params = {}) {
    return get('/api/news', {
        newsSubjectId: params.newsSubjectId
    });
}

/**
 * 删除新闻
 * @param {string} id 新闻id
 */
export function remove (id) {
    return del('/api/news/' + id);
}

/**
 * 更新新闻
 * @param {string} id 新闻id
 * @param {string} params.name 分类名称
 * @param {string} params.remark 分类备注
 */
export function update (id, params) {
    return put('/api/news/' + id, params);
}


