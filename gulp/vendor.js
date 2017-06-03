/**
 * @fileOverview cp vendor
 * @author XiaoBin Li (lixiaobin8878@gmail.com)
 */

'use strict';

var gulp = require('gulp');

gulp.task('vendor', function () {
    return gulp
        .src([
            'dist/vendor.js',
            'dist/cvendor.js'
        ])
        .pipe(gulp.dest('dist/public'));
});