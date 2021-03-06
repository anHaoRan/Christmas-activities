var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var px2rem = require('gulp-px2rem');

gulp.task('sass', function () {
  gulp.src('sass/main.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 14 versions']
    }))
    // .pipe(px2rem({
    //   baseDpr: 2,
    //   remUnit: 37.5
    // }))
    .pipe(px2rem({replace: true, rootValue: 37.5}))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename = "story-wap.min";
    }))
    .pipe(gulp.dest('./styles'));
});

gulp.task('christmas', function () {
  gulp.src('sass/christmas.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 14 versions']
    }))
    .pipe(px2rem({replace: true, rootValue: 37.5}))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./styles'));
});

gulp.task('christmas-1', function () {
  gulp.src('sass/christmas-1.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 14 versions']
    }))
    .pipe(px2rem({replace: true, rootValue: 37.5}))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./styles'));
});
gulp.task('lucky', function () {
  gulp.src('sass/lucky.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 14 versions']
    }))
    .pipe(px2rem({replace: true, rootValue: 37.5}))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./styles'));
});
gulp.task('duyao-vote', function () {
  gulp.src('sass/duyao-vote.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 14 versions']
    }))
    .pipe(px2rem({replace: true, rootValue: 37.5}))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./styles'));
});


gulp.task('watch', ['sass', 'christmas', 'christmas-1','lucky','duyao-vote'], function () {
  gulp.watch('sass/*.scss', ['sass', 'christmas', 'christmas-1','duyao-vote']);
});

gulp.task('default', ['watch']);
