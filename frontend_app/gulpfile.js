var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var cssModulesify = require('css-modulesify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('default', (done) => {
    return browserify({
        basedir: './src',
        debug: true,
        entries: ['index.tsx']
    })
    .plugin(cssModulesify, {
        rootDir: __dirname,
        output: './dist/main.css',
        generateScopedName: cssModulesify.generateShortName
      })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    // .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest("/static/js/app"));

})