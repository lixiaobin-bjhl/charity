
'use strict';

require('shelljs/global');
const egg = require('egg');
env.NODE_ENV = 'production';

egg.startCluster({
    baseDir: __dirname
});
