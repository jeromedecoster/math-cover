# math-cover

> Calculates the size and the position of a target to fit a container, adjusted to keep a focus point

A mix of <a href="https://github.com/jonom/jquery-focuspoint" target="_blank">jquery-focuspoint</a> and <a href="https://github.com/nk-components/math-fit" target="_blank">math-fit</a>

## Install

```bash
npm i jeromedecoster/math-cover
```

## Examples

#### Without focus point

```js
var cover = require('math-cover')

var target = {
  w: 200,
  h: 100
}
var parent = {
  w: 100,
  h: 200
}

// {left: -150, top: 0, width: 400, height: 200, scale: 2}
var obj = cover(target, parent)
```

#### With focus point

```js
var cover = require('math-cover')

var target = {
  w: 200,
  h: 100,
  x: 10,
  y: 10
}
var parent = {
  w: 100,
  h: 200
}

// {left: 0, top: 0, width: 400, height: 200, scale: 2}
var obj = cover(target, parent)
```

## Demo

```bash
npm i && npm start
```

| Keydown | Action |
| :------ | :------- |
| **w** | random width |
| **h** | random height |
| **r** | random width + height |
| **i** | random image |
| **d** or **space** | toggle debug |

## Thanks

Mainly forked / inspired on <a href="https://github.com/jonom/jquery-focuspoint" target="_blank">jquery-focuspoint</a> and <a href="https://github.com/nk-components/math-fit" target="_blank">math-fit</a>

## License

MIT
