const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');


function compilescss() {
    return src('src/styles/*.scss') 
      .pipe(sass())
      .pipe(prefix('last 2 versions'))
      .pipe(minify())
      .pipe(dest('dist/css')) 
  };
  
  function jsmin() {
    return src('src/js/*.js')
        .pipe(terser())
        .pipe(dest('dist/js'));
  }

  function watchTask() {
    watch('src/styles/*.scss', compilescss);
    watch('src/js/*.js', jsmin);
  }

  exports.default = series(
    compilescss,
    jsmin,
    watchTask
  );