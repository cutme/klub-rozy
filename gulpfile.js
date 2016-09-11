var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    jshint       = require('gulp-jshint'),
    compass      = require('compass-importer'),
    concat       = require('gulp-concat'),
    sass         = require('gulp-sass'),
    sassGlob     = require('gulp-sass-glob'),
    sourcemaps   = require('gulp-sourcemaps'),
    cssmin       = require('gulp-cssmin'),
    uglify       = require('gulp-uglify'),
    notify       = require("gulp-notify"),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    watch        = require('gulp-watch'),
    newer        = require('gulp-newer'),
    manifest     = require('gulp-manifest'),
    spritesmith  = require('gulp.spritesmith'),
    merge        = require('merge-stream'),
    fileinclude  = require('gulp-file-include'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload'),
	browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
    return gulp.src('source/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function()
{
    return gulp.src('source/sass/**/*.scss')
      .pipe(sassGlob())
      .pipe(sass({ importer: compass }).on('error', sass.logError))
	  .pipe(sourcemaps.write())
        .pipe(autoprefixer({
        browsers: ['last 5 versions', 'safari 5', 'ie 8' ,'ie 9', 'ie 10', 'ie 11', 'opera 12.1', 'ios 6', 'ios 7', 'Android >= 2.1'],
            cascade: false,
            add: true,
            remove: false
        }))
      .pipe(cssmin())
      .pipe(gulp.dest('public/css/'))
      .pipe(browserSync.stream());

});

gulp.task('images', function () {
    return gulp.src('source/images/**/*')
        .pipe(newer('public/images'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images'));
});

gulp.task('manifest', function(){
    gulp.src(['public/**/*'], { base: './public' })
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('source/sprites/*.png').pipe(spritesmith({
        imgName     : 'sprites.png',
        cssName     : '_sprites.scss',
        cssTemplate : 'sprites.css.handlebars',
        padding     : 2,
        algorithm   : 'top-down'
    }));
    
    var imgStream = spriteData.img.pipe(gulp.dest('source/images/'));
    var cssStream = spriteData.css.pipe(gulp.dest('source/sass/tools/'));

    return merge(imgStream, cssStream);
});

gulp.task('fileinclude', function() {
    gulp.src(['source/*.html'])
        .pipe(fileinclude({
            prefix: '<!--@',
            suffix: '-->',
            basepath: '@file'
        }))
        .pipe(gulp.dest('public/'))
        .pipe(livereload())
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'jshint', 'fileinclude']);

gulp.task('watch', function() {
    livereload.listen();
    browserSync.init({
	server: {
		baseDir: './public'
		}
	})
	
    gulp.watch('source/sprites/*.png', ['sprite']);
    gulp.watch('source/js/**/*.js', ['jshint']);
    gulp.watch('source/sass/**/*.scss', ['sass']);
    gulp.watch('source/sass/includes/**/*.scss', ['sass']);
    gulp.watch('source/sass/includes/modules/**/*.scss', ['sass']);
    gulp.watch('source/sass/includes/modules/*.scss', ['sass']);
    gulp.watch('source/sass/includes/plugins/**/*.scss', ['sass']);
    gulp.watch('source/sass/includes/plugins/*.scss', ['sass']);
    gulp.watch('source/images/**/*', ['images']);
    gulp.watch('source/images/placeholder/*', ['images']);
    gulp.watch('public/**/*', ['manifest']);
    gulp.watch('source/**/*.html', ['fileinclude']);
    gulp.watch('source/includes/**/*.html', ['fileinclude']);
    gulp.watch('source/includes/buttons/**/*.html', ['fileinclude']);
    gulp.watch('source/pdf/**/*.pdf', ['fileinclude']);
});