'use strict';

module.exports = app => {
    app.get('/', 'home.index');
    app.get('/news', 'news.index');
    app.get('/about', 'about.index');
    app.get('/case', 'case.index');
    app.get('/contact', 'contact.index');
    app.get('/join', 'join.index');
    app.get('/team', 'team.index');
    app.get('/product', 'product.index');
    app.get('/product/subject/:subjectId', 'product.subject');
    app.get('/product/:id', 'product.detail');
    app.get('/solution', 'solution.index');

    // admin 
    app.get('/admin', 'admin.main.index');
    app.get('/admin', '/admin/:path', 'admin.main.index');
    app.get('/admin/login', 'admin.main.login');
    app.get('/admin/logout', 'admin.main.logout');
    app.get('/qiniu/uptoken', 'admin.qiniu.uptoken');
    app.get('/token', 'token.index');


    app.get('/api/card/openid/:id', 'admin.card.getListByOpenid');
    app.get('/api/card/count/:id', 'admin.card.getCountByOpenid');
    app.post('/api/product/l', 'admin.product.listByids');

    app.post('/api/shippingAddress/openid', 'admin.shippingAddress.listByOpenid');

    app.post('/purchase/prepayid', 'admin.purchase.getPrepayId');
    app.post('/purchase/notice', 'admin.purchase.notice');

    app.resources('shippingAddress', '/api/shippingAddress/', 'admin.shippingAddress');
    app.resources('user', '/api/user/', 'admin.user');
    app.resources('customField', '/api/customField/', 'admin.customField');
    app.resources('role', '/api/role/', 'admin.role');
    app.resources('card', '/api/card/', 'admin.card');
    app.resources('news', '/api/news/', 'admin.news');
    app.resources('product', '/api/product/', 'admin.product');
    app.resources('newsSubject', '/api/newsSubject/', 'admin.newsSubject');
    app.resources('productSubject', '/api/productSubject/', 'admin.productSubject');
};
