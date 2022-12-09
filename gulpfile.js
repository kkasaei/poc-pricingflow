const { src, dest, task } = require("gulp");
const uglify = require("gulp-uglify");

task("compress", function () {
  return src("backend/src/public/widget.js")
    .pipe(uglify())
    .pipe(dest("backend/src/public/dist"));
});
