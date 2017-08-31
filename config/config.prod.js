module.exports = appInfo => {
    const config = {};

    config.middleware = [
        'isAdmin',
        'accessPermission',
        'gzip',
        'responseTime'
    ];

    return config;
};