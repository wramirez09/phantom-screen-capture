var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("default", ["styles"])

gulp.task("styles", function() {
    return gulp.src("src/sass/**/*.scss")
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest("public/css"))
})

gulp.task("sass:watch", function() {
    gulp.watch("src/sass/**/*.scss", ["styles"]);
})