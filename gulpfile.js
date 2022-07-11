const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { plugins } = require('@babel/preset-env/lib/plugins-compat-data');

// Função para compilar SASS, adicionar auto-prefixer e dar refresh na página.
function compilaSass() {
  return gulp.src('scss/*.scss')
  .pipe(sass({outputStyle : 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false,
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

// Função para concatenar os arquivos CSS das libs externas de javascript
function pluginsCSS() {
  return gulp.src('css/lib/*.css')
  .pipe(concat('plugins.css'))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
} 
gulp.task ('pluginsCSS', pluginsCSS);

// Função para concatenar os arquivos JS em um só
function gulpJs() {
  return gulp.src('js/scripts/*.js')
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
}
gulp.task('alljs', gulpJs);

// Função para concatenar os plugins JS
function pluginsJs() {
  return gulp
  .src(['./js/lib/aos.min.js','./js/lib/swiper.min.js'])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}
gulp.task('pluginsJs', pluginsJs)

//Função do browser sync
function browser() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}
gulp.task('browser-sync', browser);

//Função do Watch para monitorar as alterações
function watch() {
  gulp.watch('scss/*.scss', compilaSass);

  gulp.watch('css/lib/*.css', pluginsCSS);

  gulp.watch('*.html').on('change', browserSync.reload);

  gulp.watch('js/scripts/*js', gulpJs);

  gulp.watch('js/lib/*.js', pluginsJs);
}
gulp.task('watch', watch);


gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'pluginsCSS', 'alljs', 'pluginsJs'));

