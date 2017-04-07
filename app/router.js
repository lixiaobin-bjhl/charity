'use strict';

module.exports = app => {
    app.get('/', 'home.index');
    app.get('/admin/', 'admin.main.index');
};
