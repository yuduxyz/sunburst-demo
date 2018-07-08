var gulp = require('gulp')
var uglify = require('gulp-uglify')

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('build/'))
})

gulp.task('css', function () {
  return gulp.src('*.css')
    .pipe(gulp.dest('build/'))
})

gulp.task('js', function () {
  return gulp.src('*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
})

gulp.task('mock-data', function () {
  return gulp.src('*.json')
    .pipe(gulp.dest('build/'))
})

gulp.task('assets', function () {
  return gulp.src('./assets/*')
    .pipe(gulp.dest('build/assets'))
})

gulp.task('build', ['html', 'css', 'js', 'mock-data', 'assets'])