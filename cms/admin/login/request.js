/**
 * @fileOverview charity-cms-login request 
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post } from '../../../app/public/scripts/common/service';

/**
 * @param {string} params.name 登录名
 * @param {string} params.password 登录密码
 */
export function login (params) {
    return post('/api/users', params);
}