const gulp = require('../gulp');
const sass = require('../gulp-sass')(require('../sass'));
const concat = require('gulp-concat');
const watch = require('../gulp-watch');
const rename = require('../gulp-rename');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
 
gulp.task('compress', function ugliFy() {
  return pipeline(
        gulp.src('lib/*.js'),
        uglify(),
        gulp.dest('dist')
  );
})

function compileCss(done){
    gulp.src('./assets/**/*.scss')
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/'))

    done();
}
gulp.task(compileCss)

gulp.task('scripts', function conCat() {
    return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
      .pipe(concat({ path: 'new.js', stat: { mode: 0666 }}))
      .pipe(gulp.dest('./dist'));
  })

  gulp.task('callback', function watCh() {
    return watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(gulp.dest('build'));
    });
});

