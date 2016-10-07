var gulp = require('gulp');
var gulpTypeScript = require('gulp-typescript');
var gulpSourcemaps = require('gulp-sourcemaps');
var run = require('gulp-run');
var del = require('del');

// The development folder
var appDev = 'assets/app/';
// The production folder
var appProd = 'public/js/app/';
//Production dependencies
var vendor = 'public/js/vendor';

// load types compilation configuration

var tsconfig  = gulpTypeScript.createProject('tsconfig.json');

// gulp users definitions

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(appProd + '/**/*');
});

gulp.task('buildTs', function () {
    //load all types in app dev and compile them and write them to public folder
    return gulp.src(appDev + '/**/*.ts')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypeScript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(appProd));
});

gulp.task('buildCopy', function () {
    // copy all html and css to public folder
    return gulp.src([appDev + '**/*.html', appDev + '**/*.htm', appDev + '**/*.css'])
        .pipe(gulp.dest(appProd));
});

gulp.task('vendor', function () {
    // copy all production dependencies
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));

    // core-js
    gulp.src('node_modules/core-js/**')
        .pipe(gulp.dest(vendor + '/core-js'));

    //zone.js
    gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js'));

    //reflect-metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata'));

    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs'));

    //third party rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs'));
    //third party rxjs
    gulp.src('node_modules/bootstrap/**')
        .pipe(gulp.dest(vendor + '/bootstrap'));
});

// watch for changes
gulp.task('watch', function(){
    gulp.watch(appDev + '**/*.ts', ['buildTs']);
    gulp.watch(appDev + '**/*.{html,htm,css}', ['buildCopy']);
});


gulp.task('default', ['watch', 'buildTs', 'buildCopy', 'vendor'/**'runSync'**/]);
gulp.task('build', ['buildTs', 'buildCopy', 'vendor'/**'runSync'**/]);