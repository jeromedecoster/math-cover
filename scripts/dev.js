
const build = process.argv.indexOf('--build') != -1
const fs = require('fs')

//
// SERVER
//

const bs = require('browser-sync')

if (!build) {
  bs({
    server: 'public',
    ui: false,
    files: ['public/**', '!**/**DS_Store'],
    open: false,
    notify: false
  })
}

//
// JS
//

const strip = require('strip-comment').js
const browserify = require('browserify')
const split = require('split-lines')
const babelify = require('babelify')
const watchify = require('watchify')
const uglify = require('uglify-js')

const vendors = [
  'dat-gui',
  'random-int',
  'random-item',
  'react',
  'react-dom',
  'reflux-core',
  'xtend',
]

if (vendors && vendors.length) {
  browserify()
  .require(vendors)
  .bundle(function (err, data) {
    if (err) return console.error(err.message)

    if (build) {
      var options = {
        fromString: true,
            mangle: true,
          compress: true
      }
      data = uglify.minify(String(data), options).code
    }

    fs.writeFileSync('public/vendors.js', data)
  })
}

var b = browserify('src/index.js')
if (vendors && vendors.length) b.external(vendors)
b.transform(babelify, {
  presets: ['react']
})

bundle()

if (!build) {
  var w = watchify(b)
  w.on('update', bundle)
}

function bundle() {
  b.bundle(function (err, data) {
    if (err) return console.error(err.message)

    // something basic because uglify 2.6 can't parse and minify es6 js
    if (build) {
      data = strip(String(data))
      data = split(data)
        .map((e) => e.replace(/^\s*/, ''))
        .filter((e) => e != '')
        .join('\n')
    }

    fs.writeFileSync('public/bundle.js', data)
  })
}

//
// CSS
//

const chokidar = require('chokidar')
const postcss = require('postcss')

css()

if (!build) {
  chokidar
  .watch('src/index.css')
  .on('change', css)
}

function css() {
  postcss([
    require('postcss-discard-comments'),
    require('rucksack-css')({
      autoprefixer: true
    }),
    build
      ? require('cssnano')
      : require('perfectionist')({
          indentSize: 2,
          cascade: true,
        })
  ])
  .process(fs.readFileSync('src/index.css', 'utf8'))
  .then(function(result) {
    fs.writeFileSync('public/bundle.css', result.css)
  })
}
