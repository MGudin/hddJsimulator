const gulp        = require('gulp');
const watch       = require('gulp-watch');
const browserSync = require('browser-sync').create();
const browserify  = require('browserify');
const source      = require('vinyl-source-stream');
const sourcemaps  = require('gulp-sourcemaps');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const gutil       = require('gulp-util');

var babelify = require("babelify");

babelify.configure({presets: ["es2015"]});

gulp.task('javascript', function () {

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


gulp.task('default', function () {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  return watch('src/*.js', function(event){
    gulp.start('javascript');
    browserSync.reload();
  });
});
