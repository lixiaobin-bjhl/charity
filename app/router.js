'use strict';

module.exports = app => {
    app.get('/', 'home.index');
    app.get('/admin', 'admin.main.index');
    app.get('/admin', '/admin/:path', 'admin.main.index');
    app.get('/admin/login', 'admin.main.login');
    app.get('/admin/logout', 'admin.main.logout');

    app.resources('user', '/api/user/', 'user');
    app.resources('news', '/api/news/', 'news');
    app.resources('newsSubject', '/api/newsSubject/', 'newsSubject');
};
