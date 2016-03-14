var ts = require("gulp-typescript")
var tsProject = ts.createProject("./tsconfig.json");
var gulp = require("gulp");

gulp.task("compile:ts", function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    tsResult.js.pipe(gulp.dest("./dist"));
    return gulp.src('./**/*.{html,json, css}')
        .pipe(gulp.dest('./dist'));
});