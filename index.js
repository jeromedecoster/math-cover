
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
