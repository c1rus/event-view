let nodeResolve = require('rollup-plugin-node-resolve');
let commonjs = require('rollup-plugin-commonjs');
let uglify = require('rollup-plugin-uglify');

let source = 'src/';

let dist = {
  root: 'dist/',
  js: 'dist/js/',
  assets: 'dist/assets/'
};

let buildFileName = 'build.js';

let tsconfig_aot = require('./' + source + 'tsconfig-aot.json');

let config = {
  tsconfig_aot: tsconfig_aot,
  source: source,
  build: dist.root + buildFileName,
  plugins: [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js'
  ],
  index: {
    run: 'index.html',
    aot: 'index-aot.html',
    aotgz: 'index-aot-gzip.html',
    jit: 'index-jit.html'
  },
  dist: dist,
  rollup: {
    entry: source + 'main-aot.js',
    dest: dist.js + buildFileName,
    sourceMap: true,
    sourceMapFile: dist.js + buildFileName + '.map',
    format: 'iife',
    plugins: [
      nodeResolve({ jsnext: true, module: true }),
      commonjs({
        include: [
          'node_modules/rxjs/**',
          'node_modules/angular-in-memory-web-api/**'
        ],
      }),
      uglify()
    ]
  }
};
module.exports = config;
