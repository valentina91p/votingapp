'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename'),
	gp_concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var DEST = 'public/scripts/';

gulp.task('default', function() {
  return gulp.src(['./public/scripts/app.js','./public/scripts/**/*.js'])
    // This will output the non-minified version
    .pipe(gp_concat('application.js'))
    // This will minify and rename to foo.min.js
    //.pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});