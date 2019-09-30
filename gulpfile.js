var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // Подключаем gulp-minify (для сжатия JS)
var useref = require("gulp-useref");            // перемещает index.html 
var clean = require("gulp-clean");             // удаление файлов, папок
var gulpif = require("gulp-if");               // объединяет файлы в поток 
var size = require("gulp-size");                // отображает размеры файлов
var imagemin = require("gulp-imagemin");        // минифицирует картинки
var minifyCss = require("gulp-minify-css");     // минифицирует css
var del = require('del');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src",
        host: "0.0.0.0"
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
gulp.task('js', function() {
  return gulp.src("./src/js/*.js")
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./src/js'));
 })
gulp.task('dist', ['useref', 'images', 'fonts'], function() {    // сборка запускается dist, [массив задач]  
  return gulp.src('dist/**/*').pipe(size({title : 'buid'}));               // показывает сколько весит
});
gulp.task('build', ['clean'], function() {                                  // очищает папку
  gulp.start('dist');                                                     // запускаем задачу dist
});
gulp.task('clean', function() {
  return gulp.src('dist')               // выбераем папку
    .pipe(clean());                     // очистка
});
gulp.task('useref', function() {                                   
  return gulp.src('src/*.html')                                     // выбераем все htmnl
    .pipe(useref())
    .pipe(gulpif('main.js', minify()))                                 // фильтрует если js минимизирует
    .pipe(gulpif('*.css', minifyCss({compaatibility: 'ie8'})))      // фильтрует если css минимизирует (совместимость с ie8)
    .pipe(gulp.dest('dist'));                                       // 
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/*{ttf,woff,woff2,svg,eot}')                                               // выберает папку
    .pipe(gulp.dest('dist/fonts'));                                     // переносит
});
gulp.task('images', function() {
  return gulp.src('src/img/**/*')                     // выберает все картинки
    .pipe(imagemin({                                  // сжатие
      progressive: true,                              // 
      interlaced: true                                // 
    })) 
    .pipe(gulp.dest('dist/img'));                     // переносит
});
gulp.task('serve-prod', function() {

    browserSync.init({
        server: "./dist",
        host: "0.0.0.0"
    });
  })
gulp.task('default', ['serve']);