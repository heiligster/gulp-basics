/**
 * -----------------------------------------------------------------------------
 * @copyright 2015
 * @author Philipp Müller
 * @description
 * Basic gulp setup
 * -----------------------------------------------------------------------------
 */

/*@const----------------------------------------------------------------------*/
var BASE_PATH   = __dirname + '/';
var CSS_SRC     = BASE_PATH + 'src/**/*.scss';
var CSS_DEST    = BASE_PATH + 'dest/';
var CSS_OUTFILE = 'application.css';
var JS_SOURCE   = [];
var PROXY_URL   = 'your-domain.local';
var PORT        = 1337;

/*@deps-----------------------------------------------------------------------*/
var gulp    = require('gulp');
var util    = require('gulp-util');
var changed = require('gulp-changed');

var rename   = require('gulp-rename');
var postcss  = require('gulp-postcss');
var prefixer = require('autoprefixer');

var sourcemaps = require('gulp-sourcemaps');
var sass       = require('gulp-sass');
var nano       = require('cssnano');

var sync   = require('browser-sync').create();
var jsHint = require('gulp-jshint');

/*@funcs----------------------------------------------------------------------*/
/**
 * Define tasks to run via gulp.watch
 */
gulp.task('default', ['css', 'js-hint', 'sync', 'watch']);


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
    .pipe(gulp.dest(CSS_DEST))
    .pipe(sync.stream());
});


/**
 * Utilize js-hint
 */
gulp.task('js-hint', function () {
  gulp.src(JS_SOURCE)
    .pipe(jsHint())
    .pipe(jsHint.reporter('jshint-stylish'));
});


/**
 * Sync file changes and reload browser accordingly
 * See http://www.browsersync.io/docs/options/
 * to get a list of all available options
 */
gulp.task('sync', function () {
  var options = {
    proxy: PROXY_URL,
    port: PORT,
    injectChanges: true,
    notify: false,
    open: false
  };

  sync.init(options);

  gulp.watch(CSS_SRC, ['css']);
  gulp.watch('*.html').on('change', sync.reload);
});


/**
 * Gets called whenever gulp recongnizes file changes
 */
gulp.task('watch', function () {
  gulp.watch(CSS_SRC, ['css']);
  gulp.watch(JS_SOURCE, ['js-hint']);
});
