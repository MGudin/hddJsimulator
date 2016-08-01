const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

var browserSync = require('browser-sync').create();

gulp.task('babel', () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    return watch('src/*.js', function(event){
        gulp.start('babel');
        browserSync.reload();
    });
});



// Static server
