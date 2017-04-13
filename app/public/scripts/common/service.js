/**
 * @fileOverview service util
 * @author XiaoBin Li(lixiaobin8878@gmail.com)
 */

'use strict';

import axios from 'axios';


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
export function post (url, data={}, sync) {
    return request(url, data, sync, 'post');
}

/**
 * 发送请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @param {string} method get|post
 * @return {Promise}
 */
function request (url, data={}, sync, method) {

}

/**
 * 发送 get 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function get (url, data, sync) {
    return request(url, data, sync, 'get');
}

/**
 * 发送跨域的jsonp请求
 *
 * @param  {string} url
 * @param  {Object} data
 * @return {Promise}
 */
export function getJsonp(url, data) {
    return $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp'
    });
}
