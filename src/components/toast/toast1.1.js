function Toast(params) {
  var options = {}
  if (typeof params === 'string') {
    options.msg = params
  } else {
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
  this.el.className = 'pangToast'
  this.el.stopTimer1 = false
  document.body.appendChild(this.el)
  this.style = document.createElement('style')
  this.style.className = 'pangToastStyle'
  this.style.innerText = '.pangToast{display:none;max-width: 20%;padding: 5px 10px;border-radius: 10px;position: fixed;bottom:-50px;left: 50%;transform: translateX(-50%);font-size: 12px;color: #fff;background-color: #333;}'
  document.body.appendChild(this.style)
}
Toast.prototype.removeLast = function () {
  var toastEls = document.getElementsByClassName('pangToast'),
    toastStyle = document.getElementsByClassName('pangToastStyle')
  if (toastEls.length) {
    var el = toastEls[toastEls.length - 1],
      style = toastStyle[toastStyle.length - 1]
    el.stopTimer1 = true
    this.fadeOut(el, function () {
      this.remove(el, style)
    })
  }
}
Toast.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {
    document.body.removeChild(arguments[i])
  }
}
Toast.prototype.run = function () {
  var self = this
  this.el.innerText = this.msg
  this.el.style.display = 'block'
  this.height = this.getStyle('height')
  var nHeight = +this.height.replace('px', '')
  this.timer1 = setInterval(function () {
    Object.defineProperty(self.el, 'stopTimer1', {
      get(){
        return self.el.stopTimer1
      },
      set(value){
        if (value) {
          clearInterval(self.timer1)
        }
      }
    })
    if (~nHeight > (self.distance || 50)) {
      clearInterval(self.timer1)
      setTimeout(function () {
        self.fadeOut(self.el, function () {
          self.remove(self.el, self.style)
        })
      }, self.stay)
      
    } else {
      var curBottom = ~nHeight + 'px'
      self.el.style.bottom = curBottom
      nHeight--
    }
  }, 100 / this.speed)
}
Toast.prototype.fadeOut = function (el, fn) {
  var self = this
  var opacity = el.style.opacity || 1
  this.timer2 = setInterval(function () {
    if (opacity <= 0) {
      clearInterval(self.timer2)
      fn && fn.call(self)
    } else {
      el.style.opacity = opacity
      opacity -= 0.01
    }
  }, 16)
}
Toast.prototype.show = function () {
  this.removeLast()
  this.addEl()
  this.run()
}
