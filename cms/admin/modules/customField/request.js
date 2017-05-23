/**
 * @fileOverview charity-cms-customField request
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

import { post, get, del, put } from '../../../../app/public/scripts/common/service';

/**
 * 添加自定义字段 
 */
export function add (params) {
    return post('/api/customField', {
        name: params.name,
        remark: params.remark,
        default: params.default,
        required: params.required,
        type: params.type,
        options: params.options
    });
}

/**
 * 添加自定义字段
 */
export function list (params) {
    return get('/api/customField');
}

/**
 * 删除自定义字段
 * @param {string} id 自定义字段id
 */
export function remove (id) {
    return del('/api/customField/' + id);
}

/**
 * 更新自定义字段
 * 
 * @param {string} id 自定义字段id
 * @param {string} query.name 自定义字段名称
 * @param {string} query.remark 自定义字段备注信息
 * @param {string=} query.default 自定义字段默认值
 * @param {boolean} query.required 自定义字段是否必填
 * @param {boolean} query.type 自定义字段类型
 * @param {boolean} query.options 自定义字段选项(type == 1为下拉选项时ootions 才有意义)
 */
export function update (id, params) {
    return put('/api/customField/' + id, params);
}


