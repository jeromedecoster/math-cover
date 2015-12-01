(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = function (target, parent) {
  var pw = parent.w || parent.width
  var ph = parent.h || parent.height
  var tw = target.w || target.width
  var th = target.h || target.height

  var rw = pw / tw
  var rh = ph / th
  var scale = (rw > rh) ? rw : rh

  var left = (pw - tw * scale) >> 1
  var top  = (ph - th * scale) >> 1
  var width = tw * scale
  var height =  th * scale

  // focus x
  if (target.x) {
    left = -((width * (target.x / tw)) - pw + pw / 2)
    // fix right border
    if (left + width < pw) {
      left = pw - width
    }
    // fix left border
    else if (left > 0) {
      left = 0
    }
  }

  // focus y
  if (target.y) {
    top = -((height * (target.y / th)) - ph + ph / 2)
    // fix bottom border
    if (top + height < ph) {
      top = ph - height
    }
    // fix top border
    else if (top > 0) {
      top = 0
    }
  }

  return {
    left: left,
    top: top,
    width: width,
    height: height,
    scale: scale
  }
}

},{}],2:[function(require,module,exports){

const itemRandom = require('random-item')
const intRandom = require('random-int')
const assign = require('object-assign')
const domready = require('domready')
const dat = require('dat-gui')
const cover = require('..')


var images = {
  bird: {
    src: 'bird.jpg',
    focus: {x: 429, y: 641}
  },
  dolphin: {
    src: 'dolphin.jpg',
    focus: {x: 363, y: 323}
  },
  kangaroo: {
    src: 'kangaroo.jpg',
    focus: {x: 319, y: 224}
  },
  lizard: {
    src: 'lizard.jpg',
    focus: {x: 612, y: 250}
  }
}

var data = {
  image: null,
  debug: true
}

var container, img
var debug, debugContainer, debugImg
var gui


domready(function() {
  container = document.querySelector('.container')
  img = document.querySelector('.container img')

  debug = document.querySelector('.debug')
  debugContainer = document.querySelector('.debug-container')
  debugImg = document.querySelector('.debug-img')

  // init
  imageRandom(true)
  widthRandom()
  heightRandom()

  guiCreate()
  debugUpdate()

  // keyboard
  document.addEventListener('keydown', function(e) {
    // d or space
    if (e.keyCode == 32 || e.keyCode == 68) {
      debugUpdate(true)
    // i
    } else if (e.keyCode == 73) {
      imageRandom(true)
    // w
    } else if (e.keyCode == 87) {
      widthRandom(true)
    // h
    } else if (e.keyCode == 72) {
      heightRandom(true)
    // r
    } else if (e.keyCode == 82) {
      widthRandom()
      heightRandom(true)
    }
    guiUpdate()
  })

  window.addEventListener('resize', function() {
    guiUpdate()
    screenUpdate()
  })
})

function imageRandom(load) {
  var r = itemRandom(Object.keys(images))
  if (r == data.image) return imageRandom(load)
  else data.image = r
  if (load) imageLoad()
}
function imageLoad() {
  img.style.visibility = 'hidden'
  img.src = images[data.image].src
  img.onload = function() {
    screenUpdate()
    img.style.visibility = 'visible'
  }
}

function widthRandom(update) {
  data.width = intRandom(100, window.innerWidth  - 200)
  if (update) screenUpdate()
}
function heightRandom(update) {
  data.height = intRandom(100, window.innerHeight  - 200)
  if (update) screenUpdate()
}

function guiCreate() {
  gui = new dat.GUI()
  gui.add(data, 'width',  25, window.innerWidth  - 50).step(1).onChange(screenUpdate)
  gui.add(data, 'height', 25, window.innerHeight - 50).step(1).onChange(screenUpdate)
  gui.add(data, 'image', Object.keys(images)).onChange(imageLoad)
  gui.add(data, 'debug').onChange(debugUpdate)
  // disable toggle visibility when keydown 'h'
  dat.GUI.toggleHide = function() {}
}

function guiUpdate() {
  var maxWidth = window.innerWidth - 50
  gui.__controllers[0].__max = maxWidth
  if (data.width > maxWidth) {
    data.width = maxWidth
  }

  var maxHeight = window.innerHeight - 50
  gui.__controllers[1].__max = maxHeight
  if (data.height > maxHeight) {
    data.height = maxHeight
  }

  // update dat.gui
  for (var i in gui.__controllers) {
    gui.__controllers[i].updateDisplay()
  }
}

function debugUpdate(invert) {
  if (invert) data.debug = !data.debug
  debug.classList[data.debug ? 'add' : 'remove']('debug--enabled')
}

function screenUpdate() {
  resize(container, data)

  container.style.left = window.innerWidth  / 2 - data.width  / 2 + 'px'
  container.style.top  = window.innerHeight / 2 - data.height / 2 + 'px'

  var target = {w:img.naturalWidth, h:img.naturalHeight}
  assign(target, images[data.image].focus)

  var rect = container.getBoundingClientRect()
  var obj = cover(target, {w:rect.width, h:rect.height})
  resize(img, obj)

  resize(debugContainer, rect)
  resize(debugImg, img.getBoundingClientRect())
}

function resize(el, obj) {
  el.style.top = obj.top + 'px'
  el.style.left = obj.left + 'px'
  el.style.width = obj.width + 'px'
  el.style.height = obj.height + 'px'
}

},{"..":1,"dat-gui":"dat-gui","domready":"domready","object-assign":"object-assign","random-int":"random-int","random-item":"random-item"}]},{},[2]);
