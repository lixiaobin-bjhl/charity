/**
 * @fileOverview cp view
 * @author XiaoBin Li (lixiaobin8878@gmail.com)
 */

'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');

var minifyOpts  = {
    spare: true,
    empty: true,
    quotes: true,
    comments: true,
    loose: true
};

gulp.task('view', function () {
    return gulp
        .src([
            'app/view/**/*.tpl'
        ])
        .pipe(replace(/\.bundle\.js/g, '.js'))
        // .pipe(minifyHtml(minifyOpts))
        .pipe(gulp.dest('dist/view'));
});