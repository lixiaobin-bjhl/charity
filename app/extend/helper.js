
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
    }
}