
const DemoStore = require('../stores/DemoStore')
const Actions = require('../actions/Actions')
const React = require('react')
const View = require('./View')
const Gui = require('./Gui')

class Demo extends React.Component {

  constructor(props) {
    super(props)

    this.state = DemoStore.getState()

    DemoStore.listen((newState) => {
      this.setState(newState)
    })
  }

  render() {
    return (<div>
        <View/>
        <Gui/>
      </div>)
  }
}

module.exports = Demo
