var gulp = require("gulp");
var runSequence = require("run-sequence");
var exec = require('child_process').exec;

gulp.task("install-client", function(done) {
    exec("cd client && npm i && cd ..", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done();
    });
});

gulp.task("install-server", function(done) {
    exec("cd server && npm i && cd ..", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done();
    });
});

gulp.task("build-client", function(done) {
    exec("tsc -p client", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done();
    });
});

gulp.task("build-server", function(done) {
    exec("tsc -p server", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done();
    });
});

gulp.task("default", function(done) {
    runSequence("build-client", "build-server", done);
});