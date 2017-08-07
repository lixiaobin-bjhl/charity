/**
 * @fileOverview charity-cms-user request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 获取订单列表
 */
export function list (params = {}) {
    return get('/api/user');
}

