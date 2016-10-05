var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var runSeq = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var sh = require('shelljs');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');

var paths = {
    sass: ['./scss/**/*.scss']
};

// Live reload business.
gulp.task('reload', function() {
    livereload.reload();
});

gulp.task('reloadCSS', function() {
    return gulp.src('./www/css/style.css').pipe(livereload());
});


gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('lintJS', function() {

    return gulp.src(['./www/js/**/*.js', './server/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('buildJS', ['lintJS'], function() {
    return gulp.src(['./www/js/app.js', './www/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/public'));
});

gulp.task('buildJSProduction', function() {
    return gulp.src(['./www/js/app.js', './www/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./www/public'));
});

gulp.task('build', function() {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'sass']);
    } else {
        runSeq(['buildJS', 'sass']);
    }
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('default', function() {
    gulp.start('build');

    // Run when anything inside of browser/js changes.
    gulp.watch('www/js/**', function() {
        runSeq('buildJS', 'reload');
    });

    // Run when anything inside of browser/scss changes.
    gulp.watch('www/scss/**', function() {
        runSeq('sass', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);

    // Reload when a template (.html) file changes.
    gulp.watch(['www/**/*.html', 'server/app/views/*.html'], ['reload']);

    // // Run server tests when a server file or server test file changes.
    // gulp.watch(['tests/server/**/*.js', 'server/app/**/*.js'], ['testServerJS']);

    // // Run browser testing when a browser test file changes.
    // gulp.watch('tests/browser/**/*', ['testBrowserJS']);

    livereload.listen();
})