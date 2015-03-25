// Include gulp
var gulp = require('gulp');

gulp.task('config', function(cb){

    global.target = {
        development:'./build',
        prod:'./build',
        test:'./build',
        staging:'./build'
    };

    // Bootstrap path configuration
    global.bootstrapPath = 'node_modules/bootstrap-sass/assets/';

    // Font-Awesome path configuration
    global.fontawesomePath = 'node_modules/font-awesome/';

    // Syntax is either :
    // 1) {file:'module_name_or_path'} (relative to node_modules folder) => will means require('module_name_or_path')
    // 2) {file:'path_to_module/module_name', expose:'module_alias'} (relative to node_modules folder) => will means require('module_alias')
    // ie :
    // 1) {file:'react-router'}
    // 2) {file:'reflux/dist/reflux', expose:'reflux'}
    global.externalDeps = [
        {file:'react/addons'},
        {file:'react-router'},
        {file:'es6-promise'},
        {file:'jquery'},
        {file:'lodash'},
        {file:'moment'},
        {file:'airflux'},
        {file:'validator'},
        {file:'immutable'},
        {file:'classnames'},
        {file:'whatwg-fetch'}
    ];

    cb();
});


