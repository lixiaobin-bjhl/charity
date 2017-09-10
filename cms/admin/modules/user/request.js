/**
 * @fileOverview charity-cms-user request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 获取订单列表
 * 
 * @param {number} params.pageNum 分页码
 * @param {number} params.pageSize 分页大小
 * 
 * @return {Promise}
 */
export function list (params = {}) {
    return get('/api/user', {
        pageSize: params.pageSize,
        pageNum: params.pageNum
    });
}

