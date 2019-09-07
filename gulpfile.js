var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("./src/sass/*.sass", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/sass/*/*.sass", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/js/*.js", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/sass/*.sass")
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concatCSS("style.css"))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);