// All the modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var istanbul = require('gulp-istanbul');
var notify = require('gulp-notify');
var bower = require('bower');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

// Live reload
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('default', ['sass']);

// build css from ionic generated code base
// gulp.task('sass', function(done) {
//   gulp.src('./scss/ionic.app.scss')
//     .pipe(sass())
//     .on('error', sass.logError)
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });


gulp.task('reloadCSS', function () {
    return gulp.src('./www/css/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {

    return gulp.src(['./www/js/**/*.js', './server/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('buildJS', ['lintJS'], function () {
    return gulp.src(['./www/js/app.js', './www/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/js'));
});

// gulp.task('watch', function() {
//   gulp.watch(paths.sass, ['sass']);
// });


//Uncomment this when we actually write a test
// gulp.task('testServerJS', function () {
//     require('babel-register');
//     //testing environment variable
//     process.env.NODE_ENV = 'testing';
//   return gulp.src('./tests/server/**/*.js', {
//     read: false
//   }).pipe(mocha({ reporter: 'spec' }));
// });

// gulp.task('testServerJSWithCoverage', function (done) {
//     //testing environment variable
//     process.env.NODE_ENV = 'testing';
//     gulp.src('./server/**/*.js')
//         .pipe(istanbul({
//             includeUntested: true
//         }))
//         .pipe(istanbul.hookRequire())
//         .on('finish', function () {
//             gulp.src('./tests/server/**/*.js', {read: false})
//                 .pipe(mocha({reporter: 'spec'}))
//                 .pipe(istanbul.writeReports({
//                     dir: './coverage/server/',
//                     reporters: ['html', 'text']
//                 }))
//                 .on('end', done);
//         });
// });

// gulp.task('testBrowserJS', function (done) {
//     //testing environment variable
//     process.env.NODE_ENV = 'testing';
//     karma.start({
//         configFile: __dirname + '/tests/browser/karma.conf.js',
//         singleRun: true
//     }, done);
// });

gulp.task('buildCSS', function () {

    var sassCompilation = sass();
    sassCompilation.on('error', console.error.bind(console));

    return gulp.src('./scss/ionic.app.scss')
        .pipe(plumber({
            errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
        }))
        .pipe(sourcemaps.init())
        .pipe(sassCompilation)
        .pipe(sourcemaps.write())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./www/css'));
});

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function () {
    return gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./www/css'))
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./www/js/app.js', './www/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./www/js'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);


// Composed tasks
// --------------------------------------------------------------

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildCSS']);
    }
});

gulp.task('default', function () {

    gulp.start('build');

    // Run when anything inside of browser/js changes.
    gulp.watch('www/js/**', function () {
        runSeq('buildJS', 'reload');
    });

    // Run when anything inside of browser/scss changes.
    gulp.watch('scss/**', function () {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);

    // Reload when a template (.html) file changes.
    gulp.watch(['www/**/*.html', 'server/app/views/*.html'], ['reload']);

    // // Run server tests when a server file or server test file changes.
    // gulp.watch(['tests/server/**/*.js', 'server/app/**/*.js'], ['testServerJS']);

    // // Run browser testing when a browser test file changes.
    // gulp.watch('tests/browser/**/*', ['testBrowserJS']);

    livereload.listen();

});


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
