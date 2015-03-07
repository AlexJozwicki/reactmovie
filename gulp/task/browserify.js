var connect = require('gulp-connect'),
    gulp = require('gulp'),
    handleErrors = require('../utils/handleErrors'),
    browserify   = require('browserify'),
    watchify     = require('watchify'),
    uglify       = require('gulp-uglify'),
    gulpif       = require('gulp-if'),
    streamify    = require('gulp-streamify'),
    bundleLogger = require('../utils/bundleLogger'),
    source       = require('vinyl-source-stream');

require('../config');

var runBrowserifyTask = function (options) {

    var appConfigFile = options.appConfigFile;
    var compress = options.compress;
    var debug = options.debug;

    var bundleMethod = browserify({
        // Specify the entry point of your app
        entries: ['./src/js/app.js'],
        extensions: ['.coffee', '.jsx'],
        global: true,
        debug: debug,
        cache: {}, packageCache: {}, fullPaths: true
    }).external(global.externalDeps.map (function(dep){
            if(dep.expose) {
                return dep.expose
            } else {
                return dep.file;
            }
        })
    ).external('AppConfig');

    var bundler = options.watch ? watchify(bundleMethod) : bundleMethod;

    var bundle = function() {
        // Log when bundling starts
        bundleLogger.start();

        return bundler

            .bundle()
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specify the
            // desired output filename here.
            .pipe(source('app.js'))
            .pipe(gulpif(compress, streamify(uglify())))
            // Specify the output destination
            .pipe(gulp.dest(global.target[options.target]+'/js/'))
            // Refresh browser(s)
            //.pipe(browserSync.reload({stream:true}))
            .pipe(connect.reload())
            // Log when bundling completes!
            .on('end', bundleLogger.end);
    };

    if(options.watch) {
        // Re bundle with watchify on changes.
        bundler.on('update', bundle);
    }

    var vendorBundler = browserify({
        debug: debug // We also add source mapping
        //transform: extraTransforms
    }).require(global.externalDeps).require([{file:appConfigFile, expose:'AppConfig'}]);

    // Run the vendor bundle when the default Gulp task starts
    vendorBundler
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulpif(compress, streamify(uglify())))
        .pipe(gulp.dest(global.target[options.target]+'/js/'));

    return bundle();
};

gulp.task('browserify-staging', ['config'], function() {
    return runBrowserifyTask({
        appConfigFile:'./staging-conf.js',
        debug:true,
        compress:true,
        watch:false,
        target:'prod'
    });
});

gulp.task('browserify-test', ['config'], function() {
    return runBrowserifyTask({
        appConfigFile:'./test-conf.js',
        debug:true,
        compress:true,
        watch:false,
        target:'prod'
    });
});

gulp.task('browserify-prod', ['config'], function() {
    return runBrowserifyTask({
        appConfigFile:'./prod-conf.js',
        debug:true,
        compress:true,
        watch:false,
        target:'prod'
    });
});

gulp.task('watchify', ['config'], function() {
    return runBrowserifyTask({
        appConfigFile:'./dev-conf.js',
        debug:true,
        compress:false,
        watch:true,
        target:'development'
    });
});
