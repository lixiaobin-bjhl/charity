/**
 * @fileOverview charity-qiniu-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var qiniu = require("qiniu");

module.exports = app => {
	class QiNiuController extends app.Controller {
		* uptoken() {
            qiniu.conf.ACCESS_KEY = 'r4SJA1H61syYjIh9prAPS8BewYVr2N37P3YzQspY';
            qiniu.conf.SECRET_KEY = 'd0_mNHLUXwoa6e7MbPIA2h0f40Wxfrg5IxqInsbR';
            
            function uptoken(bucket) {
                var putPolicy = new qiniu.rs.PutPolicy(bucket);
                return putPolicy.token();
            }
            var token = uptoken('chairty');
            this.ctx.body = this.ctx.helper.success({
		        token	
	        });
		}
	}
	return QiNiuController;
};
