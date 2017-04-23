'use strict';

// had enabled by egg
// exports.static = true;

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.proxyworker = {
    enable: true,
    package: 'egg-development-proxyworker'
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};
