/**
 * @fileOverview charity-middleware-isAmdin
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var optionalSessionAdminUrl = [
    '/admin/login'
];

module.exports = (options, app) => {
   return function* (next) { 
        var requestUrl = this.request.url;
        if (requestUrl.indexOf('admin') > -1 
            && optionalSessionAdminUrl.indexOf(requestUrl) === -1) {
                var user = this.session.user;
                // 没有登录，就跳到登录页
                if (!user) {
                    this.redirect('/admin/login');
                    return;
                }
        }
        yield next;
   };
};
