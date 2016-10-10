let gulp = require('gulp');
let $ = require('gulp-load-plugins')({ lazy: true });
let del = require('del');
let lite = require('lite-server');
let rollup = require('rollup');

let config = require('./build-config');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('build', ['rollup'], function () {
  log('building');
});

gulp.task('rollup', ['ngc', 'copy-files-to-dist'], function (done) {
  rollup.rollup(config.rollup).then(writeBundle);

  function writeBundle(bundle) {
    bundle.write({
      format: config.rollup.format,
      dest: config.rollup.dest
    });
    log('rolled up');
    done();
  }
});

gulp.task('ngc', ['clean-aot'], function ngc(done) {
  log('Running ngc AoT');
  let exec = require('child_process').exec;
  let os = require('os');
  let cmd = os.platform() === 'win32' ?
    'node_modules\\.bin\\ngc' : './node_modules/.bin/ngc';
  let args = ' -p src/tsconfig-aot.json';

  exec(cmd + args, function (err, stdout, stderr) {
    log('ngc AoT compiler completed')
    done(err);
  });
});

gulp.task('copy-files-to-dist', ['copy-aot-index', 'copy-js', 'copy-assets'], function (done) {
  done();
});

gulp.task('copy-aot-gzip', ['gzip'], function (done) {
  done();
});

gulp.task('copy-js', function () {
  log('copying js');
  let js = config.plugins;

  return gulp.src(js)
    .pipe(gulp.dest(config.dist.js));
});

gulp.task('copy-assets', function () {
  log('copying assets');
  let assets = ['src/assets/**/*'];

  return gulp.src(assets)
    .pipe(gulp.dest(config.dist.assets));
});

gulp.task('build-gzip', ['copy-aot-gzip-index'], function (done) {
  log('building the gzipped bundle');
  done();
});

gulp.task('copy-aot-gzip-index', ['gzip'], function () {
  log('copy aot gzip index');

  return gulp.src(config.source + config.index.aotgz)
    .pipe($.rename(config.index.run))
    .pipe(gulp.dest(config.dist.root));
});

gulp.task('gzip', ['build', 'copy-js', 'copy-assets'], function () {
  log('gzipping');
  let source = [].concat(config.plugins, config.build);
  source = [config.dist.js + '**/*.js'];

  return gulp.src(source)
    .pipe($.gzip())
    .pipe(gulp.dest(config.dist.js));
});

gulp.task('copy-aot-index', ['clean-index'], function () {
  log('copy aot index');

  return gulp.src(config.source + config.index.aot)
    .pipe($.rename(config.index.run))
    .pipe(gulp.dest(config.dist.root));
});

gulp.task('copy-jit-index', ['clean-index'], function () {
  log('copy jit index');

  return gulp.src(config.source + config.index.jit)
    .pipe($.rename(config.index.run))
    .pipe(gulp.dest(config.dist.root));
});

gulp.task('clean-aot', function (done) {
  log('clean-aot');
  let delFolder = config.source + config.tsconfig_aot.angularCompilerOptions.genDir;
  del([delFolder]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    done()
  });
});

gulp.task('clean-index', function (done) {
  log('clean-index');
  del([config.dist.root + config.index.run]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    done()
  });
});

gulp.task('clean-js', function (done) {
  log('clean-js');
  del([config.dist.js]).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    done()
  });
});

function log(msg) {
  if (typeof (msg) === 'object') {
    for (let item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

module.exports = gulp;
