const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser'); //gulp-uglify not support es6+ syntax
const rename = require('gulp-rename');
const less = require('gulp-less');
const cssClean = require('gulp-clean-css');

const browserSync = require('browser-sync').create();

gulp.task('js', function(){
    return gulp.src(['*.js','!gulpfile.js'])
      .pipe(terser())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest('dist/'))
})

gulp.task('less', function(){
    return gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest('css/'))
})
gulp.task('css',function(){
    return gulp.src('css/*.css')
        .pipe(concat('build.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssClean({ compatibility: 'ie*' }))
        .pipe(gulp.dest('dist/css/'))
})

// function watch(){
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
//     gulp.watch('*.js').on('change', browserSync.reload);

// }
gulp.task('default', gulp.series('js','less','css'))
// exports.default = watch;