'use strict';

module.exports = app => {
    app.get('/', 'home.index');
    console.log(app.middlewares.isAdmin.toString());
    // app.get('/admin/', app.middlewares.isAdmin, 'admin.main.index');
    app.get('/admin', 'admin.main.index');
    // app.get('/admin/:path', app.middlewares.isAdmin, 'admin.main.index');
    app.get('/admin/:path', 'admin.main.index');
    app.get('/admin/login', 'admin.main.login');
    app.get('/admin/logout', 'admin.main.logout');
    app.resources('users', '/api/users/', 'users');
};
