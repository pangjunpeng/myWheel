function Toast(params) {
  var options = {}
  if(typeof params === 'string'){
    options.msg = params
  }else{
    option = params
  }
  this.msg = options.msg || '请输入内容'
  this.speed = options.speed || 6.25
  this.distance = options.distance || 100
  this.stay = options.stay
  if (!this.stay && this.stay !== 0) {
    this.stay = 1000
  }
  this.timer1 = null
  this.timer2 = null
  this.show.call(this)
}
Toast.prototype.getStyle = function (attr) {
  if (this.el.style[attr]) {
    return this.el.style[attr]
  }
  if (this.el.currentStyle) {
    return this.el.currentStyle[attr];
  } else {
    return getComputedStyle(this.el, false)[attr];
  }
}
Toast.prototype.addEl = function () {
  this.el = document.createElement('span')
  this.el.id = 'pangToast'
  document.body.appendChild(this.el)
  this.style = document.createElement('style')
  this.style.id = 'pangToastStyle'
  this.style.innerText = '#pangToast{display:none;max-width: 20%;padding: 5px 10px;border-radius: 10px;position: fixed;bottom:-50px;left: 50%;transform: translateX(-50%);font-size: 12px;color: #fff;background-color: #333;}'
  document.body.appendChild(this.style)
}
Toast.prototype.remove = function () {
  var el = document.getElementById('pangToast'), style = document.getElementById('pangToastStyle')
  if (el && style) {
    document.body.removeChild(el)
    document.body.removeChild(style)
  }
}
Toast.prototype.run = function () {
  var self = this
  this.el.innerText = this.msg
  this.el.style.display = 'block'
  this.height = this.getStyle('height')
  var nHeight = +this.height.replace('px', '')
  this.timer1 = setInterval(function () {
    if (~nHeight > (self.distance || 50)) {
      clearInterval(self.timer1)
      self.fadeOut()
    } else {
      var curBottom = ~nHeight + 'px'
      self.el.style.bottom = curBottom
      nHeight--
    }
  }, 100 / this.speed)
}
Toast.prototype.fadeOut = function (fn) {
  var self = this
  setTimeout(function () {
    var opacity = self.el.style.opacity || 1
    self.timer2 = setInterval(function () {
      if (opacity <= 0) {
        clearInterval(self.timer2)
        fn && fn()
        self.remove()
      } else {
        self.el.style.opacity = opacity
        opacity -= 0.01
      }
    }, 16)
  }, this.stay)
}
Toast.prototype.show = function () {
  this.remove()
  this.addEl()
  this.run()
}