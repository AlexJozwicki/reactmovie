var connect      = require('gulp-connect'),
    gulp         = require('gulp'),
    handleErrors = require('../utils/handleErrors'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps');

require('../config');

gulp.task('sass', ['config'], function () {
    return sass('./src/css/main.scss', {
            compass: true,
            bundleExec: false,
            precision: 10,
            loadPath: [global.bootstrapPath+'stylesheets/', global.fontawesomePath+'scss/'],
            sourcemap: true
        })
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
});
