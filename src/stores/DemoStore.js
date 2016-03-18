
const Actions = require('../actions/Actions')
const itemRandom = require('random-item')
const intRandom = require('random-int')
const Reflux = require('reflux-core')
const xtend = require('xtend')

const data = [
  {
            image: 'bird',
              src: 'bird.jpg',
                x: 429 / 667,
                y: 641 / 1000,
     naturalWidth: 667,
    naturalHeight: 1000
  },
  {
            image: 'dolphin',
              src: 'dolphin.jpg',
                x: 363 / 1000,
                y: 323 / 667,
     naturalWidth: 1000,
    naturalHeight: 667
  },
  {
            image: 'kangaroo',
              src: 'kangaroo.jpg',
                x: 319 / 1000,
                y: 224 / 667,
     naturalWidth: 1000,
    naturalHeight: 667
  },
  {
            image: 'lizard',
              src: 'lizard.jpg',
                x: 612 / 922,
                y: 250 / 666,
     naturalWidth: 922,
    naturalHeight: 666
  }
]

var state = {
      ready: false,
      width: randWidth(),
     height: randHeight(),
   maxWidth: maxWidth(),
  maxHeight: maxHeight(),
     images: data.map((e) => e.image),
      debug: true,
        div: false,
}

state = xtend(state, itemRandom(data))

var DemoStore = Reflux.createStore({

  listenables: Actions,

  init() {
    // throttle please
    window.addEventListener('resize', this.resize)

    // keyboard
    document.addEventListener('keydown', (e) => {
      // d or space
      if (e.keyCode == 32 || e.keyCode == 68) {
        state.debug = !state.debug
        this.trigger(state)
      // i
      } else if (e.keyCode == 73 && e.altKey === false) {
        state = xtend(state, randImage())
        this.trigger(state)
      // w
      } else if (e.keyCode == 87) {
        state.width = randWidth()
        this.trigger(state)
      // h
      } else if (e.keyCode == 72) {
        state.height = randHeight()
        this.trigger(state)
      // u
      } else if (e.keyCode == 85) {
        state.width = randWidth()
        state.height = randHeight()
        this.trigger(state)
      }
    })
  },

  resize() {
    state.maxWidth = maxWidth()
    if (state.width > state.maxWidth) state.width = state.maxWidth

    state.maxHeight = maxHeight()
    if (state.height > state.maxHeight) state.height = state.maxHeight

    this.trigger(state)
  },

  update(obj) {
    state = obj.image !== undefined
      ? xtend(state, data.filter((e) => e.image == obj.image)[0])
      : xtend(state, obj)

    this.trigger(state)
  },

  getState() {
    return state
  }
})

function maxWidth() {
  return window.innerWidth - 50
}

function maxHeight() {
  return window.innerHeight - 50
}

function randWidth() {
  return intRandom(100, window.innerWidth  - 200)
}
function randHeight() {
  return intRandom(100, window.innerHeight - 200)
}
function randImage() {
  var o = itemRandom(data)
  return o.image == state.image
    ? randImage()
    : o
}

module.exports = DemoStore
