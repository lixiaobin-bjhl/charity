/**
 * @fileOverview charity-cms-newsSubject request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del } from '../../../../app/public/scripts/common/service';

/**
 * 添加新闻分类 
 */
export function add (params) {
    return post('/api/newsSubject', {
        name: params.name,
        remark: params.remark
    });
}

/**
 * 添加新闻分类
 */
export function list (params) {
    return get('/api/newsSubject');
}

/**
 * 删除新闻分类
 * @param {string} id 新闻分类id
 */
export function remove (id) {
    return del('/api/newsSubject/' + id);
}

