
const DemoStore = require('../stores/DemoStore')
const cover = require('../..')
const React = require('react')

class View extends React.Component {
  constructor(props) {
    super(props)

    this.state = DemoStore.getState()

    DemoStore.listen((newState) => {
      this.setState(newState)
    })
  }

  render() {

    var cx = window.innerHeight / 2 - this.state.height / 2
    var cy = window.innerWidth  / 2 - this.state.width  / 2

    var styleContainer = {
         top: cx + 'px',
        left: cy + 'px',
       width: this.state.width + 'px',
      height: this.state.height + 'px'
    }

    var target = {
      w: this.state.naturalWidth,
      h: this.state.naturalHeight,
      x: this.state.x,
      y: this.state.y
    }

    var parent = {
      w: this.state.width,
      h: this.state.height
    }

    var obj = cover(target, parent)

    var styleImage = {
         top: obj.top + 'px',
        left: obj.left + 'px',
       width: obj.width + 'px',
      height: obj.height + 'px'
    }

    var debugImage = {
         top: cx + obj.top + 'px',
        left: cy + obj.left + 'px',
       width: obj.width + 'px',
      height: obj.height + 'px'
    }

    if (this.state.div) {
      styleContainer.backgroundImage = 'url(' + this.state.src + ')'
      styleContainer.backgroundPosition = obj.position
      styleContainer.backgroundSize = 'cover'
    }

    return (
      <div>
        { this.state.debug ? <Debug container={styleContainer} image={debugImage} /> : null }

        <div className="container" style={styleContainer}>
          { !this.state.div ? <Image src={this.state.src} style={styleImage} /> : null }
        </div>
      </div>
    )
  }
}

function Debug(props) {
  return (<div>
      <div className='debug-container' style={props.container}></div>
      <div className='debug-image' style={props.image}></div>
    </div>)
}

function Image(props) {
  return <img src={props.src} style={props.style} />
}

module.exports = View
