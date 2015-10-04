/**
 * -----------------------------------------------------------------------------
 * @copyright 2015
 * @author Philipp Müller
 * @package
 * @description
 * Basic gulp setup
 * -----------------------------------------------------------------------------
 */

/*@const----------------------------------------------------------------------*/
var BASE_PATH    = __dirname + '/';
var CSS_SRC      = BASE_PATH + 'src/**/*.scss';
var CSS_DEST     = BASE_PATH + 'dest/';
var CSS_OUTFILE  = 'application.css';

/*@deps-----------------------------------------------------------------------*/
var gulp    = require('gulp');
var util    = require('gulp-util');
var changed = require('gulp-changed');
var rename  = require('gulp-rename');

var postcss    = require('gulp-postcss');
var prefixer   = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass       = require('gulp-sass');
var nano       = require('cssnano');

/*@funcs----------------------------------------------------------------------*/
/**
 * Define tasks to run via gulp.watch
 */
gulp.task('default', ['css', 'watch']);


/**
 * Run preprocessors and compile css
 */
gulp.task('css', function () {
  return gulp.src(CSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./src/partials']
    }))
    .pipe(postcss([prefixer, nano]))
    .pipe(rename(CSS_OUTFILE))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(CSS_DEST));
});


/**
 * Gets called whenever gulp recongnizes file changes
 */
gulp.task('watch', function () {
  gulp.watch(CSS_SRC, ['css']);
});
