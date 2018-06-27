/**
 * scrollTrigger.js
 * Created by pang On 2018-06-27 18:30 。
 */
export default function scrollTrigger (params, fn) {
  let {el, target, scrollX = true, scrollY = true} = params
  el.preDisX = el.preDisY = el.disX = el.disY = 0
  let style = getStyle(target, 'transform')
  if (style !== 'none') {
    let translate = style.match(/matrix\(1, 0, 0, 1, (.*), (.*)\)/)
    el.preDisX = +translate[1]
    el.preDisY = +translate[2]
  }
  el.ontouchstart = function (e) {
    scrollX && (this.startX = e.changedTouches[0].clientX)
    scrollY && (this.startY = e.changedTouches[0].clientY)
  }
  el.ontouchmove = function (e) {
    if (scrollX) {
      this.currentClientX = e.changedTouches[0].clientX
      this.disX = this.currentClientX - this.startX + this.preDisX
    }
    if (scrollY) {
      this.currentClientY = e.changedTouches[0].clientY
      this.disY = this.currentClientY - this.startY + this.preDisY
    }
    target.style.transform = `translate(${this.disX}px, ${this.disY}px)`
  }
  el.ontouchend = function (e) {
    scrollX && (this.preDisX = this.disX)
    scrollY && (this.preDisY = this.disY)
    if (fn) {
      var res = {}
      scrollX && (res.translateX = this.disX)
      scrollY && (res.translateY = this.disY)
      !scrollX && !scrollY && (res = '无法移动，请开启参数')
      fn(res)
    }
  }
}
function getStyle (obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}
