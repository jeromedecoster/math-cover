
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
  var posx = '50%'
  var posy = '50%'

  // focus x
  if (target.x != undefined && target.x >= 0 && target.x <= 1) {
    left = -(width * target.x - pw + pw / 2)
    // fix right border
    if (left + width < pw) {
      left = pw - width
    }
    // fix left border
    else if (left > 0) {
      left = 0
    }

    if (-width + pw != 0) {
      posx = (100 * left / (-width + pw)) + '%'
    }
  }

  // focus y
  if (target.y && target.y >= 0 && target.y <= 1) {
    top = -(height * target.y - ph + ph / 2)
    // fix bottom border
    if (top + height < ph) {
      top = ph - height
    }
    // fix top border
    else if (top > 0) {
      top = 0
    }

    if (-height + ph != 0) {
      posy = (100 * top / (-height + ph)) + '%'
    }
  }

  return {
        left: left,
         top: top,
       width: width,
      height: height,
       scale: scale,
    position: posx + ' ' + posy
  }
}
