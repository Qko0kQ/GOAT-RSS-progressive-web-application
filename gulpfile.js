const gulp = require('gulp');
gulp.task('generate-service-worker', function(callback) {
    const path = require('path');
    const swPrecache = require('sw-precache');
    const rootDir = 'build';

    swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
    }, callback);
});

gulp.task('dev', function(callback) {
    const path = require('path');
    const swPrecache = require('sw-precache');
    const rootDir = 'src';

    swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
    }, callback);
});