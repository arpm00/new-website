const gulp = require('gulp');
//const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssimport = require('postcss-import');
const browserSync = require('browser-sync').create();
const mixins = require('postcss-mixins');
const hexrgba = require('postcss-hexrgba');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;

//compile scss to css
function style() {
  //1.where is my scss file
  return gulp.src('./app/assets/styles/styles.css')
  //2.pass the file through scss compiler
  .pipe(postcss([cssimport, mixins, cssvars, nested, hexrgba, autoprefixer]).on('error', function (errorInfo) {
    console.log(errorInfo.toString());
    this.emit('end');
  }))
  //3.where do i save the compiled css
  .pipe(gulp.dest('./app/temp/styles'))
  //4.stream changes to all browser
  .pipe(browserSync.stream());
}

function scripts(callback) {
  return gulp.src('./app/assets/scripts/app.js')
    .pipe(webpackStream(webpackConfig), webpack).on('error', function(err, stats){
      if (err) {
        console.log(err.toString());
      }
      console.log(stats.toString());
    })
    .pipe(gulp.dest('./app/temp/scripts/'))
    .pipe(browserSync.stream())
    callback();
}

function deleteDistFolder() {
  return del("./dist");
}

function copyGeneralFiles() {
  const pathToCopy = [
    '.app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]
  return gulp.src(pathToCopy)
  .pipe(gulp.dest("./dist"));
}

function build() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icon','!./app/assets/images/icon/**/*'])
  .pipe(imagemin({
    progressive: true,
    interlays: true,
    multipass: true
  }))
  .pipe(gulp.dest("./dist/assets/images"));
}

function minified() {
  return gulp.src("./app/index.html")
  .pipe(usemin({
    css: [function(){return rev()}, function(){return cssnano()}],
    jsAttributes: {
      async: true
    },
    js: [function(){return rev()}, function(){return uglify()}]
  }))
  .pipe(gulp.dest("./dist"));
}

function watch() {
  
  browserSync.init({
    notify: false,
    server: {
      baseDir: './app'
    }
  })
  gulp.watch('./app/assets/styles/**/*.css', style);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
  gulp.watch('./app/assets/scripts/**/*.js', scripts);
  //gulp.watch(gulp.series(deleteDistFolder, build, minified, copyGeneralFiles));
}

function previewDist() {
  
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch('./dist/assets/styles/**/*.css', style);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/assets/scripts/**/*.js', scripts);
}

exports.style = style;
exports.scripts = scripts;
exports.build = gulp.series(deleteDistFolder, build, minified, copyGeneralFiles);
exports.watch = watch;
exports.dist = previewDist;