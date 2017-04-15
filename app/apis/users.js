/**
 * @fileOverview charity-user-api
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strcit';

exports.show = function * (ctx) {
    ctx.body =  '123';
};

exports.create = function* (ctx) {
    this.data = {"name": "xiaobin"};
};
