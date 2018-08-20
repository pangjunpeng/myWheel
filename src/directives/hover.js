/**
 * hover.js
 * Created by pang On 2018-08-17 15:48 。
 *
 * html:
 * <div v-hover="hoverClass"></div>
 *
 * script:
 * data(){
 *  hoverClass: {
 *  pc: 'hover-style-pc',
 *  mb: 'hover-style-mb'
 * }
 *
 * css:
 * .hover-style-pc:hover{
 *  color:red
 * }
 * .hover-style-mb{
 *  color:red
 * }
 */
import Vue from 'vue'
export default (Vue) => {
  Vue.directive('hover', {
    inserted(el, binding, vnode){
      let self = vnode.context
      if (self.isPc) {
        let hClass = binding.value.pc
        el.addClass(hClass)
      }else{
        let hClass = binding.value.mb
        el.ontouchstart = e => {
          el.addClass(hClass)
          setTimeout(function () {
            el.removeClass(hClass)
          }, 1000)
        }
        let time = binding.value.time || 100
        el.ontouchend = () => {
          setTimeout(function () {
            el.removeClass(hClass)
          }, time)
        }
      }
    }
  })
}
