let gulp = require('gulp');
let fs = require('fs');
let cleanCSS = require('gulp-clean-css');
let $ = require('gulp-load-plugins')();

gulp.task('buildResources', function () {
    return gulp.src('statics/*/**')
        .pipe($.replace(/\/\* replace (.+) \*\//g, function (s, filename) {
            let fileContent = fs.readFileSync(filename, 'utf8');
            return fileContent;
        }))
        .pipe(gulp.dest('disc'));
});

gulp.task('less', function () {
    return gulp.src('statics/styles/less/index.less')
        .pipe($.less())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('disc/styles'));
});

gulp.task('build', function (callback) {
    $.sequence(
        'less',
        'buildResources'
    )(callback);
});

gulp.task('watch', function () {
    gulp.watch('statics/**/*', ['build']);
});
