/**
 * @fileOverview charity-home-controller
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var abstractController = require('./abstractController');
var fs = require('fs');
var path = require('path');

module.exports = app => {
	class HomeController extends abstractController(app) {
		* index() {
			// 获取产品分类列表
			var productSubject = yield this.getProductSubject();
			// 获取新闻分类列表
			var newsSubject = yield this.getNewsSubject();

			yield this.ctx.render('home.tpl', {
				productSubject,
				newsSubject,
				page: 'home',
				env: this.ctx.helper.env()
			});
		}

		* qrcode () {

			var res = this.ctx.res;
			res.setHeader('Content-Type', 'image/jpeg');
			var content = fs.readFileSync(path.join(__dirname, "../public/img/qrcode.png"), "binary"); 
			res.writeHead(200, "ok");
			res.write(content, "binary");
			res.end();
		}

		* code18301277911 () {
			var res = this.ctx.res;
			res.setHeader('Content-Type', 'image/jpeg');
			var content = fs.readFileSync(path.join(__dirname, "../public/img/18301277911.png"), "binary"); 
			res.writeHead(200, "ok");
			res.write(content, "binary");
			res.end();
		}

		* txt () {
			var res = this.ctx.res;
			var content = fs.readFileSync(path.join(__dirname, "../public/txt/pY0TlJsDvU.txt")); 
			res.writeHead(200, "ok");
			res.write(content);
			res.end();
		}
	}
	return HomeController;
};
