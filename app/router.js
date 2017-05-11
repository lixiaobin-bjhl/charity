'use strict';

module.exports = app => {
    app.get('/', 'home.index');
    app.get('/news', 'news.index');
    app.get('/about', 'about.index');
    app.get('/case', 'case.index');
    app.get('/contact', 'contact.index');
    app.get('/join', 'join.index');
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

    app.resources('user', '/api/user/', 'admin.user');
    app.resources('role', '/api/role/', 'admin.role');
    app.resources('news', '/api/news/', 'admin.news');
    app.resources('product', '/api/product/', 'admin.product');
    app.resources('newsSubject', '/api/newsSubject/', 'admin.newsSubject');
    app.resources('productSubject', '/api/productSubject/', 'admin.productSubject');
};
