
const fs = require('fs')

//
// SERVER
//

const bs = require('browser-sync')

bs({
  server: 'public',
  ui: false,
  files: 'public/**',
  open: false,
  notify: false
})

//
// JS
//

const browserify = require('browserify')
const watchify = require('watchify')
const pkg = require('../package')

const JS_SRC = 'src/index.js'
const JS_OUT = 'public/bundle.js'

var args = watchify.args
// args.fullPaths = false
var w = watchify(browserify(JS_SRC, args))

w.external(pkg.vendors)

w.on('update', js)
// must be called to activate watchify
js()

function js() {
  w.bundle(function (err, data) {
    if (err) return console.error(err.message)
    fs.writeFileSync(JS_OUT, data)
  })
}

//
// CSS
//

const strip = require('strip-comment')
const chokidar = require('chokidar')
const myth = require('myth')

const CSS_SRC = 'src/index.css'
const CSS_OUT = 'public/bundle.css'

chokidar
.watch(CSS_SRC)
.on('add', css)
.on('change', css)

function css() {
  var data = fs.readFileSync(CSS_SRC, 'utf8')
  data = strip.js(data)
  data = myth(data, {source:'.', compress: false})
  fs.writeFileSync(CSS_OUT, data)
}
