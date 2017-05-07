/**
 * @fileOverview charity-c端页面的controller 抽象
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = app => {
	class AbstractController extends app.Controller {
		* getProductSubject() {
			// 获取产品分类列表
			return yield this.service.productSubject.list();
		}
        * getNewsSubject () {
            // 获取新闻分类列表
			return yield this.service.newsSubject.list();
        }
	}
	return AbstractController;
};
