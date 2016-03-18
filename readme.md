# math-cover

> Calculates the size and the position of a target to fit a container, adjusted to keep a focus point

A mix of <a href="https://github.com/jonom/jquery-focuspoint" target="_blank">jquery-focuspoint</a> and <a href="https://github.com/nk-components/math-fit" target="_blank">math-fit</a>

## Install

```bash
npm i math-cover
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

// {left: -150, top: 0, width: 400, height: 200, scale: 2, position: '50% 50%'}
var obj = cover(target, parent)
```

#### With focus point

Params `x` and `y` are ratio of `target.w` and `target.h` and must be `0 <= ratio <= 1`

```js
var cover = require('math-cover')

var target = {
  w: 200,
  h: 100,
  x: .2,
  y: .2
}
var parent = {
  w: 100,
  h: 200
}

// {left: -30, top: 0, width: 400, height: 200, scale: 2, position: '10% 50%'}
var obj = cover(target, parent)
```

## Demo

<a href="http://jeromedecoster.github.io/math-cover" target="_blank">demo</a>

```bash
npm i && npm start
```

| Keydown | Action |
| :------ | :------- |
| **w** | random width |
| **h** | random height |
| **u** | random width + height |
| **i** | random image |
| **d** or **space** | toggle debug |

## Thanks

Mainly forked / inspired on <a href="https://github.com/jonom/jquery-focuspoint" target="_blank">jquery-focuspoint</a> and <a href="https://github.com/nk-components/math-fit" target="_blank">math-fit</a>

## License

MIT
