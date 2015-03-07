// karma.conf.js

var appConfigFile = './dev-conf.js'

module.exports = function(config) {
    config.set({

        // include browserify first in used frameworks
        frameworks: [ 'browserify', 'mocha', 'sinon' ],

        browsers: ['Chrome'], // 'Firefox'

        files: [
            'test/**/*-test.js'
        ],

        preprocessors: {
            'test/**/*-test.js': [ 'browserify' ]
        },

        // see what is going on
        logLevel: 'LOG_DEBUG',

        browserify: {
            configure:function(bundle){
                bundle.on('prebundle', function() {
                    //bundle.external('foobar');
                    bundle.require(appConfigFile, {expose:'AppConfig'});
                });
            },
            global: true,
            debug: true,
            cache: {}, packageCache: {}, fullPaths: true,
            transforms: [ 'reactify', 'coffeeify'],
            extensions: ['.js', '.jsx', '.coffee']
        }
    });
}

