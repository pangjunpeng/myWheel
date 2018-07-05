/**
 * selectorPicker.js
 * Created by pang On 2018-06-27 18:30 。
 */

function SelectPicker (params, fn) {
  this.el = params.el
  this.target = params.target
  this.initIndex = params.index
  this.init()
  this.scrollTo(this.initIndex || 'top')
  fn && fn(this.itemIndex)
}
SelectPicker.prototype = {
  init: function(){
    this.elHeight = this.getAttr(this.el, 'height')
    this.targetHeight = this.getAttr(this.target, 'height')
    this.tItemHeight = this.getAttr(this.target.firstChild, 'height')
    this.initTop = (this.elHeight - this.tItemHeight) / 2
    this.initBottom = -this.targetHeight + (this.elHeight + this.tItemHeight) / 2
  },
  scrollTrigger: function (params={}, fn) {
    let self = this   // 保存this
    self.el.preDisX = self.el.preDisY = self.el.disX = self.el.disY = 0 // 初始化
    let {scrollX = true, scrollY = true} = params    // 获取参数
    
    // 获取默认位置
    let style = self.getStyle(self.target, 'transform')
    if (style !== 'none') {
      let translate = ''
      if(style.match('translate')){
        translate = style.match(/translate\((.*)px, (.*)px\)/)
      }else if(style.match('matrix')){
        translate = style.match(/matrix\(1, 0, 0, 1, (.*), (.*)\)/)
      }
      self.el.preDisX = +translate[1]
      self.el.preDisY = +translate[2]
    }
    
    // 操作
    self.el.ontouchstart = function (e) {
      e.preventDefault()
      scrollX && (this.startX = e.changedTouches[0].clientX)
      scrollY && (this.startY = e.changedTouches[0].clientY)
    }
    self.el.ontouchmove = function (e) {
      e.preventDefault()
      if (scrollX) {
        this.currentClientX = e.changedTouches[0].clientX
        this.disX = this.currentClientX - this.startX + this.preDisX
      }
      if (scrollY) {
        this.currentClientY = e.changedTouches[0].clientY
        this.disY = this.currentClientY - this.startY + this.preDisY
        if(this.disY > self.initTop){
          this.disY = self.initTop
        }
        if(this.disY < self.initBottom){
          this.disY = self.initBottom
        }
        self.itemIndex = Math.round((self.initTop - this.disY) / self.tItemHeight)
        self.target.childNodes.forEach(function(item){
          item.style.fontWeight = ''
        })
        self.target.childNodes[self.itemIndex].style.fontWeight = 800
      }
      self.target.style.transform = `translate(${this.disX}px, ${this.disY}px)`
    }
    self.el.ontouchend = function (e) {
      e.preventDefault()
      var res = {}
      if(scrollX){
        res.translateX = this.preDisX = this.disX
      }
      if(scrollY) {
        res.translateY = this.preDisY = this.disY
        res.index = self.itemIndex
        self.scrollTo(self.initTop - self.itemIndex * self.tItemHeight + 'px')
      }
      !scrollX && !scrollY && (res = '无法移动，请开启参数')
      if (fn) {
        fn(res)
      }
      if(typeof params === 'function'){
        params(res)
      }
    }
  },
  scrollTo: function (x, y) {
    let self = this
    let left = 0, top = 0
    // 设置默认位置
    if(arguments.length === 1){
      left = 0
      let index = arguments[0]
      if(typeof index === 'string'){
        index === 'top' && (top = self.initTop)
        index.endsWith('px') && (top = arguments[0].replace('px', ''))
      }
      if(typeof arguments[0] === 'number'){
        top = self.initTop -  arguments[0] * self.tItemHeight
      }
    }
    if(top > self.initTop){
      top = self.initTop
    }
    if(top < self.initBottom){
      top = self.initBottom
    }
    self.itemIndex = Math.round((self.initTop - top) / self.tItemHeight)
    self.target.childNodes[self.itemIndex].style.fontWeight = 800
    self.target.style.transform = `translate(${left}px, ${top}px)`
  },
  getStyle: function(obj, attr){
    if(obj.style[attr]){
      return obj.style[attr]
    }
    if(window.getComputedStyle){
      return getComputedStyle(obj, false)[attr]
    }else{
      return obj.currentStyle[attr]
    }
    return [obj, attr]
  },
  getAttr: function(el, attr, radio=1){
    if (Object.prototype.toString.call(el).match('HTMLDocument')) {
      console.log('无法获取')
      return false
    }
    if(el.style[attr]){
      return el.style[attr]
    }
    let value = this.getStyle(el, attr),
      reg1 = /(.*)\%$/,
      reg2 = /(.*)px$/
    if (value.match(reg2)) {
      return value.replace('px', '') * radio
    } else if (value.match(reg1)) {
      return this.getAttr(el.parentNode, attr, value.replace(reg1, '$1') * radio / 100)
    } else if (value === 'auto') {
      if(this.getStyle(el, 'display') !== 'inline'){
        let height = 0
        for(let i=0; i<el.childNodes.length; i++){
          height += this.getAttr(el.childNodes[i], 'height')
        }
        return height
      }
      return false
    } else if (!value) {
      console.log('该元素无宽高')
      return false
    }
  }
}
export default SelectPicker

