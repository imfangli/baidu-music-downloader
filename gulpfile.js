var gulp = require("gulp");
var sass = require("gulp-sass");
var browserify = require('gulp-browserify');

// Compile SCSS into CSS
gulp.task("sass", function() {
    gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./dist/css"));
});

// Watch SCSS files & Compile
gulp.task("sass:watch", function () {
    gulp.watch("./src/scss/*.scss", ["sass"]);
});

// Browserify JS
gulp.task('js', function() {
    // Single entry point to browserify
    gulp.src('src/js/main.js')
        .pipe(browserify({
            insertGlobals : false,
            debug : true
        }))
        .pipe(gulp.dest('./dist/js'))
});

// Watch JS files & Browserify
gulp.task("js:watch", function () {
    gulp.watch("src/js/*.js", ["js"]);
});

