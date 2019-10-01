const gulp = require('gulp');
//const sass = require('gulp-sass');
//const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssimport = require('postcss-import');

//compile scss to css
function style() {
  //1.where is my scss file
  return gulp.src('./app/assets/styles/styles.css')
  //2.pass the file through scss compiler
  .pipe(postcss([cssimport, cssvars, nested, autoprefixer]))//.on('error', sass.logError))
  //3.where do i save the compiled css
  .pipe(gulp.dest('./app/temp/styles'));
  //4.stream changes to all browser
  //.pipe(browserSync.stream());
}

function watch() {
  // browserSync.init({
  //   server: {
  //     baseDir: './'
  //   }
  // })
  gulp.watch('./app/assets/styles/styles.css', style);
  //gulp.watch('./*.html').on('change', browserSync.reload);
  //gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;