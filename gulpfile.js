const gulp = require('gulp');
//const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssimport = require('postcss-import');
const browserSync = require('browser-sync').create();
const mixins = require('postcss-mixins');

//compile scss to css
function style() {
  //1.where is my scss file
  return gulp.src('./app/assets/styles/styles.css')
  //2.pass the file through scss compiler
  .pipe(postcss([cssimport, mixins, cssvars, nested, autoprefixer]).on('error', function (errorInfo) {
    console.log(errorInfo.toString());
    this.emit('end');
  }))
  //3.where do i save the compiled css
  .pipe(gulp.dest('./app/temp/styles'))
  //4.stream changes to all browser
  .pipe(browserSync.stream());
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
  gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;