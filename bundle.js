(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (target, parent) {
var pw = parent.w || parent.width;
var ph = parent.h || parent.height;
var tw = target.w || target.width;
var th = target.h || target.height;
var rw = pw / tw;
var rh = ph / th;
var scale = rw > rh ? rw : rh;
var left = pw - tw * scale >> 1;
var top = ph - th * scale >> 1;
var width = tw * scale;
var height = th * scale;
var posx = '50%';
var posy = '50%';
if (target.x != undefined && target.x >= 0 && target.x <= 1) {
left = -(width * target.x - pw + pw / 2);
if (left + width < pw) {
left = pw - width;
}
else if (left > 0) {
left = 0;
}
if (-width + pw != 0) {
posx = 100 * left / (-width + pw) + '%';
}
}
if (target.y && target.y >= 0 && target.y <= 1) {
top = -(height * target.y - ph + ph / 2);
if (top + height < ph) {
top = ph - height;
}
else if (top > 0) {
top = 0;
}
if (-height + ph != 0) {
posy = 100 * top / (-height + ph) + '%';
}
}
return {
left: left,
top: top,
width: width,
height: height,
scale: scale,
position: posx + ' ' + posy
};
};
},{}],2:[function(require,module,exports){
const Reflux = require('reflux-core');
var Actions = Reflux.createActions(['update']);
module.exports = Actions;
},{"reflux-core":"reflux-core"}],3:[function(require,module,exports){
const DemoStore = require('../stores/DemoStore');
const Actions = require('../actions/Actions');
const React = require('react');
const View = require('./View');
const Gui = require('./Gui');
class Demo extends React.Component {
constructor(props) {
super(props);
this.state = DemoStore.getState();
DemoStore.listen(newState => {
this.setState(newState);
});
}
render() {
return React.createElement(
'div',
null,
React.createElement(View, null),
React.createElement(Gui, null)
);
}
}
module.exports = Demo;
},{"../actions/Actions":2,"../stores/DemoStore":7,"./Gui":4,"./View":5,"react":"react"}],4:[function(require,module,exports){
const DemoStore = require('../stores/DemoStore');
const Actions = require('../actions/Actions');
const dat = require('dat-gui');
const React = require('react');
var data, gui;
class Gui extends React.Component {
constructor(props) {
super(props);
this.state = DemoStore.getState();
DemoStore.listen(newState => {
data.width = newState.width;
gui.__controllers[0].__max = newState.maxWidth;
data.height = newState.height;
gui.__controllers[1].__max = newState.maxHeight;
data.image = newState.image;
data.debug = newState.debug;
data.div = newState.div;
for (var i in gui.__controllers) {
gui.__controllers[i].updateDisplay();
}
});
}
componentDidMount() {
data = DemoStore.getState();
gui = new dat.GUI();
gui.add(data, 'width', 25, data.maxWidth).step(1).onChange(() => Actions.update({ width: data.width }));
gui.add(data, 'height', 25, data.maxHeight).step(1).onChange(() => Actions.update({ height: data.height }));
gui.add(data, 'image', data.images).onChange(() => Actions.update({ image: data.image }));
gui.add(data, 'debug').onChange(() => Actions.update({ debug: data.debug }));
gui.add(data, 'div').onChange(() => Actions.update({ div: data.div }));
dat.GUI.toggleHide = function () {};
}
render() {
return null;
}
}
module.exports = Gui;
},{"../actions/Actions":2,"../stores/DemoStore":7,"dat-gui":"dat-gui","react":"react"}],5:[function(require,module,exports){
const DemoStore = require('../stores/DemoStore');
const cover = require('../..');
const React = require('react');
class View extends React.Component {
constructor(props) {
super(props);
this.state = DemoStore.getState();
DemoStore.listen(newState => {
this.setState(newState);
});
}
render() {
var cx = window.innerHeight / 2 - this.state.height / 2;
var cy = window.innerWidth / 2 - this.state.width / 2;
var styleContainer = {
top: cx + 'px',
left: cy + 'px',
width: this.state.width + 'px',
height: this.state.height + 'px'
};
var target = {
w: this.state.naturalWidth,
h: this.state.naturalHeight,
x: this.state.x,
y: this.state.y
};
var parent = {
w: this.state.width,
h: this.state.height
};
var obj = cover(target, parent);
var styleImage = {
top: obj.top + 'px',
left: obj.left + 'px',
width: obj.width + 'px',
height: obj.height + 'px'
};
var debugImage = {
top: cx + obj.top + 'px',
left: cy + obj.left + 'px',
width: obj.width + 'px',
height: obj.height + 'px'
};
if (this.state.div) {
styleContainer.backgroundImage = 'url(' + this.state.src + ')';
styleContainer.backgroundPosition = obj.position;
styleContainer.backgroundSize = 'cover';
}
return React.createElement(
'div',
null,
this.state.debug ? React.createElement(Debug, { container: styleContainer, image: debugImage }) : null,
React.createElement(
'div',
{ className: 'container', style: styleContainer },
!this.state.div ? React.createElement(Image, { src: this.state.src, style: styleImage }) : null
)
);
}
}
function Debug(props) {
return React.createElement(
'div',
null,
React.createElement('div', { className: 'debug-container', style: props.container }),
React.createElement('div', { className: 'debug-image', style: props.image })
);
}
function Image(props) {
return React.createElement('img', { src: props.src, style: props.style });
}
module.exports = View;
},{"../..":1,"../stores/DemoStore":7,"react":"react"}],6:[function(require,module,exports){
const Demo = require('./components/Demo');
const ReactDOM = require('react-dom');
const React = require('react');
ReactDOM.render(React.createElement(Demo, null), document.querySelector('[react-demo]'));
},{"./components/Demo":3,"react":"react","react-dom":"react-dom"}],7:[function(require,module,exports){
const Actions = require('../actions/Actions');
const itemRandom = require('random-item');
const intRandom = require('random-int');
const Reflux = require('reflux-core');
const xtend = require('xtend');
const data = [{
image: 'bird',
src: 'bird.jpg',
x: 429 / 667,
y: 641 / 1000,
naturalWidth: 667,
naturalHeight: 1000
}, {
image: 'dolphin',
src: 'dolphin.jpg',
x: 363 / 1000,
y: 323 / 667,
naturalWidth: 1000,
naturalHeight: 667
}, {
image: 'kangaroo',
src: 'kangaroo.jpg',
x: 319 / 1000,
y: 224 / 667,
naturalWidth: 1000,
naturalHeight: 667
}, {
image: 'lizard',
src: 'lizard.jpg',
x: 612 / 922,
y: 250 / 666,
naturalWidth: 922,
naturalHeight: 666
}];
var state = {
ready: false,
width: randWidth(),
height: randHeight(),
maxWidth: maxWidth(),
maxHeight: maxHeight(),
images: data.map(e => e.image),
debug: true,
div: false
};
state = xtend(state, itemRandom(data));
var DemoStore = Reflux.createStore({
listenables: Actions,
init() {
window.addEventListener('resize', this.resize);
document.addEventListener('keydown', e => {
if (e.keyCode == 32 || e.keyCode == 68) {
state.debug = !state.debug;
this.trigger(state);
} else if (e.keyCode == 73 && e.altKey === false) {
state = xtend(state, randImage());
this.trigger(state);
} else if (e.keyCode == 87) {
state.width = randWidth();
this.trigger(state);
} else if (e.keyCode == 72) {
state.height = randHeight();
this.trigger(state);
} else if (e.keyCode == 85) {
state.width = randWidth();
state.height = randHeight();
this.trigger(state);
}
});
},
resize() {
state.maxWidth = maxWidth();
if (state.width > state.maxWidth) state.width = state.maxWidth;
state.maxHeight = maxHeight();
if (state.height > state.maxHeight) state.height = state.maxHeight;
this.trigger(state);
},
update(obj) {
state = obj.image !== undefined ? xtend(state, data.filter(e => e.image == obj.image)[0]) : xtend(state, obj);
this.trigger(state);
},
getState() {
return state;
}
});
function maxWidth() {
return window.innerWidth - 50;
}
function maxHeight() {
return window.innerHeight - 50;
}
function randWidth() {
return intRandom(100, window.innerWidth - 200);
}
function randHeight() {
return intRandom(100, window.innerHeight - 200);
}
function randImage() {
var o = itemRandom(data);
return o.image == state.image ? randImage() : o;
}
module.exports = DemoStore;
},{"../actions/Actions":2,"random-int":"random-int","random-item":"random-item","reflux-core":"reflux-core","xtend":"xtend"}]},{},[6]);