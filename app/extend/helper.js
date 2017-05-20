
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
    },
    /**
     * 获取当前主账号，分账号对应的唯一手机号 
     */
    mobile () {
        var user = this.ctx.session.user;

        // session中没有用户，就在request header中找（比如下微信小程序）
        if (!user) {
            user = {
                type: 1,
                mobile: +this.ctx.request.header.mobile
            }     
        }
        
        // 如果是超管账号，或者公司主账号type为0或1 对应的就是mobile
        if (user.type === 0 || user.type === 1) {
            return user.mobile;
        }
        // 如果公司分账号，就是对应的masterMobile
        if (user.type == 2) {
            return user.masterMobile;
        }
        return 0;
    },
    compass () {
        var mobile = this.mobile();
        return {
            $or: [
                {
                    'author.mobile': mobile
                },
                {
                    'author.masterMobile': mobile
                }
            ]
        }
    } 
}