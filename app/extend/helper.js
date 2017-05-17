
'use strict';

module.exports = {
    success (data) {
        return {
            code: 0,
            data: data
        };
    },
    error (code, message) {
        return {
            code: code,
            message: message
        }
    },
    /**
     * 判读当前请求是不是ajax请求 
     */
    isajax () {
        return this.ctx.request.header['x-requested-with'] == 'XMLHttpRequest';
    }
}