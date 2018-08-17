/**
 * base.js
 * Created by pang On 2018-08-17 17:26 。
 */
import Vue from 'vue'
change()
let timer
window.onresize = function () {
  timer && clearTimeout(timer)
  timer = setTimeout(change, 200)
}
function change() {
  document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 10 + 'px'
  if (document.documentElement.clientWidth > 520) {
    document.getElementsByTagName('html')[0].style.fontSize = 52 + 'px'
  }
}
Vue.prototype.isPc = !navigator.userAgent.match('Mobile')
// 函数节流
Vue.prototype.throttle = function (fn, time) {
  let flag = true
  return function (...args) {
    if (flag) {
      fn.apply(null, args)
      flag = false
      setTimeout(() => {
        flag = true
      }, time)
    }
  }
}
export default Vue.prototype
