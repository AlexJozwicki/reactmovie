var connect      = require('gulp-connect'),
    gulp         = require('gulp'),
    handleErrors = require('../utils/handleErrors'),
    sass         = require('gulp-ruby-sass');

require('../config');

gulp.task('sass', ['config'], function () {
    return gulp.src('./src/css/main.scss')
        .pipe(sass({
            compass: true,
            bundleExec: false,
            precision: 10,
            loadPath: [global.bootstrapPath+'stylesheets/', global.fontawesomePath+'scss/'],
            sourcemap: false              //TODO: upgrade to SASS 3.3.x to support sourcemap
            //sourcemapPath: './src/css/' //TODO: upgrade to SASS 3.3.x to support sourcemap
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
});
