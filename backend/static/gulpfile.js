'use strict';

const gulp = require('gulp'),
  autoPreFixer = require('autoprefixer'),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss"),
  sass = require('gulp-sass'),
  plumber = require("gulp-plumber"),
  browserSync = require('browser-sync').create();

const browserIfy = require('browserify'),
  babelIfy = require('babelify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglIfy = require('gulp-uglifyjs'),
  sourceMaps = require('gulp-sourcemaps');

const paths = {
  style: {
    main: 'scss/style.{sass,scss}',
    watch: 'scss/**/*.{sass,scss}',
    dest: 'assets/css/'
  },
  js: {
    main: 'js/main.js',
    all: './js/**/*.js',
    dest: 'assets/js/'
  }
};

// BrowserSync
function browserServer(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    //proxy: "http://name.loc/", // for wp and osp
    open: true,
    port: 3080
  });
  done();
}

// BrowserSync Reload
function browserServerReload(done) {
  browserSync.reload();
  done();
}

// Scss scss
function css() {
  return gulp
    .src(paths.style.main)
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    })).on('error', sass.logError)
    //.pipe( postcss([autoPreFixer(), cssnano()]) )
    .pipe(postcss([autoPreFixer()]))
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return browserIfy({
    entries: paths.js.main,
    debug: true
  })
    .transform(babelIfy, {
      presets: [
        ["@babel/preset-env"]
      ]
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    //.pipe(sourceMaps.init())
    //.pipe(uglIfy())
    //.pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// watch
function watchFiles() {
  gulp.watch(paths.style.watch, css);
  gulp.watch('**/*.html', browserServerReload);
  gulp.watch(paths.js.all, scripts);
}

// define complex tasks
const js = gulp.series(scripts, browserServerReload);
const server = gulp.series(gulp.parallel(browserServer, watchFiles));
const watch = gulp.series(watchFiles);

// export tasks
exports.css = css;
exports.js = js;
exports.server = server;
exports.default = watch;
