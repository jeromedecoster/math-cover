
const DemoStore = require('../stores/DemoStore')
const Actions = require('../actions/Actions')
const dat = require('dat-gui')
const React = require('react')

var data, gui

class Gui extends React.Component {

  constructor(props) {
    super(props)

    this.state = DemoStore.getState()

    DemoStore.listen((newState) => {

      // next time, build it without `dat-gui` it will be more react friendly
      data.width = newState.width
      gui.__controllers[0].__max = newState.maxWidth

      data.height = newState.height
      gui.__controllers[1].__max = newState.maxHeight

      data.image = newState.image
      data.debug = newState.debug
      data.div = newState.div

      // update dat.gui
      for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay()
      }
    })
  }

  componentDidMount() {

    data = DemoStore.getState()

    gui = new dat.GUI()
    gui.add(data, 'width',  25, data.maxWidth).step(1).onChange(() => Actions.update({width: data.width}))
    gui.add(data, 'height', 25, data.maxHeight).step(1).onChange(() => Actions.update({height: data.height}))
    gui.add(data, 'image', data.images).onChange(() => Actions.update({image: data.image}))
    gui.add(data, 'debug').onChange(() => Actions.update({debug: data.debug}))
    gui.add(data, 'div').onChange(() => Actions.update({div: data.div}))
    // disable toggle visibility when keydown 'h'
    dat.GUI.toggleHide = function() {}
  }

  render() {
    return null
  }
}

module.exports = Gui
