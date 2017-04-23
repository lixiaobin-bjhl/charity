
'use strict';

module.exports = {
    foo(param) {
        console.log(123123);
            // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    },
    success (data) {
        return {
            code: 0,
            data: data
        };
    }
}