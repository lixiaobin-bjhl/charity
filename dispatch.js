
'use strict';

require('shelljs/global');
const egg = require('egg');
env.NODE_ENV = 'production';

egg.startCluster({
    baseDir: __dirname,
    https: true,
    key: './7479d459-1a34-4550-a4b9-75cd10a9e3af.key',
    cert: './7479d459-1a34-4550-a4b9-75cd10a9e3af.pem'
});
