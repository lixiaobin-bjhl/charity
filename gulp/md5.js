/**
 * @fileOverview md5
 * @author XiaoBin Li (lixiaobin8878@gmail.com)
 */

'use strict';

var md5 = require("gulp-md5-plus");
var gulp = require('gulp');

gulp.task('md5:css', ['view'], function () {
    return gulp
        .src([
            'dist/public/**/*.css',
        ])
        .pipe(md5(10, 'dist/view/**/*.tpl', {
             dirLevel: 1
        }))
        .pipe(gulp.dest('dist/public'));
});

gulp.task('md5:script', ['view', 'vendor'], function() {
    gulp.src([
       'dist/public/**/*.js',
    ])
    .pipe(md5(10, 'dist/view/**/*.tpl', {
        dirLevel: 1
    }))
    .pipe(gulp.dest('dist/public'));
});

gulp.task('md5:img', ['md5:css', 'view'], function() {
    return gulp
        .src([
            'app/public/img/**/*.png',
            'app/public/img/**/*.jpg',
            'app/public/img/**/*.jpeg'
        ])
        .pipe(md5(10, [
            'dist/public/**/*.css',
            'dist/public/**/*.js',
            'dist/view/**/*.tpl'
        ], {
            dirLevel: 1
        }))
        .pipe(gulp.dest('dist/public/img'));
});

gulp.task('md5', [
    'md5:css',
    'md5:script',
    'md5:img',
], function (cb) {
    console.log('md5 success');
    cb();
});

