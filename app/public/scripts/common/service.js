/**
 * @fileOverview service util
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import axios from 'axios';
var cookie = require('js-cookie');

/**
 * 添加ajax request interceptor
 */
axios.interceptors.request.use(function (config) {
    config.headers['x-csrf-token'] = cookie.get('csrfToken');
    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 添加ajax response interceptor
 */
axios.interceptors.response.use(function (response) {
    var data = response.data;
    if (data.code === 0) {
        return response.data;
    } else {
        toast(data.message || '系统异常', 'error');
        return Promise.reject(data);
    }
}, function (error) {
    toast('系统异常', 'error');
    return Promise.reject(error);
});

/**
 * 错误处理
 *
 * @inner
 * @param {Object} response 返回的 JSON 数据
 * @return {Object}
 */
function errorHandler(response) {
    var code = response.code;
}

/**
 * 发送 post 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function post(url, data = {}, sync) {
    return axios.post(url, data);
}

/**
 * 发送 delete 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function del(url, data = {}, sync) {
    return axios.delete(url, data);
}

/**
 * 发送 get 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function get(url, data = {}, sync) {
    return axios.get(url, data);
}

/**
 * 发送 update 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function put(url, data = {}, sync) {
    return axios.put(url, data);
}