const gulp        = require('gulp');
const watch       = require('gulp-watch');
const babel       = require('gulp-babel');
const browserSync = require('browser-sync').create();
const browserify  = require('browserify');
const babelify    = require("babelify");
const source      = require('vinyl-source-stream');
const sourcemaps  = require('gulp-sourcemaps');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const gutil       = require('gulp-util');
const tape        = require('gulp-tape');
const tapColorize = require('tap-colorize');

babelify.configure({presets: ["es2015"]});

gulp.task('javascript', () => {

  var b = browserify({
    entries: 'src/app.js',
    standalone: 'libhdd',
    debug: true,
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', () => {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  watch('src/*.js', () => {
    gulp.start('javascript');
    browserSync.reload();
  });

});

gulp.task('run_tests', () => {
  return gulp.src('test/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(tape({
      reporter: tapColorize(),
      bail: true
    }));
});

gulp.task('test', () => {
  watch(['test/*.js', 'src/**/*.js'], () => {
    gulp.start('run_tests');
  });
});
