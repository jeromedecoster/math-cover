
const browserify = require('browserify')
const uglify = require('uglify-js')
const pkg = require('../package')
const fs = require('fs')

var b = browserify()

b.require(pkg.vendors)

b.bundle(function (err, data) {
  if (err) return console.error(err.message)

  var options = {
    fromString: true,
    mangle: false,
    compress: false
  }
  data = uglify.minify(String(data), options).code

  fs.writeFileSync('public/vendors.js', data)
})
