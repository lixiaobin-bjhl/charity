/**
 * @fileOverview charity-middleware-asscess-permission
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = (options, app) => {

   var acitonAuth = {
      'get': 1,
      'post': 2,
      'put': 3,
      'delete': 4 
   };

    // 不需要判断权限的 API
    var optionalNoAuthApiUrl = [
        '/api/user',
        '/api/card'
    ];

   return function* (next) { 
        var request = this.request;
        var requestUrl = request.url;
        var method = request.method.toLowerCase();
        console.log(requestUrl);
        if (requestUrl.indexOf('api') > -1) {

                // 微信过来的api，并且是get请求，不走验证了
                if (request.header['x-requested-with'] != 'XMLHttpRequest' && method == 'get') {
                    yield next;
                    return;
                }

                var user = this.session.user;
                // 没有登录，不需要判断类似于登录类的API
                if (optionalNoAuthApiUrl.indexOf(requestUrl) > -1) {
                    yield next;
                    return;
                }

                var authority = null;
                var moduleName = /api\/(\w+[^\?\/])/.exec(requestUrl)[1];
                var modules = this.app.config.modules;
                var module = modules[moduleName];

                if (!module) {
                    this.body = this.helper.error(2, '访问的模块不存在');
                    return;
                }

                var moduleId = module.id;

                // TODO(lixiaobin) authority 存储到redis中
                authority = this.session.authority;
                var authNumber = authority[moduleId];
                
                // 没有权限
                if (!(authNumber && authNumber & acitonAuth[method])) {
                    this.body = this.helper.error(2, '没有权限访问');
                    return;
                }
        }
        yield next;
   };
};