const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser'); //gulp-uglify not support es6+ syntax
const rename = require('gulp-rename');
const less = require('gulp-less');
const cssClean = require('gulp-clean-css');

const browserSync = require('browser-sync').create();

function js(){
    return gulp.src(['*.js'])
      .pipe(terser())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('dist/'));
}

function lessStyle(){
    return gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest('css/'))
}
// gulp.task('css',['less'],function(){ //css is waiting for it's dependency -> less to compiled before it runs
//     return gulp.src('css/*.css')
//         .pipe(concat('build.css'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(cssClean({ compatibility: 'ie*' }))
//         .pipe(gulp.dest('dist/css/'))
// })

function css(){
    return gulp.src('css/*.css')
        .pipe(concat('build.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssClean({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('*.css', css);
    gulp.watch('*.less', gulp.series(lessStyle,css));
    gulp.watch('*.js', js).on('change', browserSync.reload);
}

exports.default = gulp.series(gulp.parallel(js,lessStyle),css);
exports.watch = watch;