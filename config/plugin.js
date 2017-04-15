'use strict';

// had enabled by egg
// exports.static = true;

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};

exports.rest = {
    enable: true,
    package: 'egg-rest'
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};
