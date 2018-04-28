/**
 * mouseBubble.js
 * Created by pangjunpeng On 2018-04-24 15:35 。
 * @email justdoit0212@163.com
 * eg: new MouseBubble({
 *       value: ['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'],
 *       color: '#a77ee8',
 *       distance: 100
 *     })
 */

class MouseBubble {
  constructor(params) {
    this.params = params
    this.init()
  }
  
  init() {
    this.params.valueCount = 0
    document.addEventListener('click', (e) => {
      new DoSpan(this.params, e)
      this.params.valueCount++
    })
  }
}

class DoSpan {
  constructor(params, e) {
    Object.assign(this, params)
    this.createSpan(e)
  }
  
  createSpan(e) {
    this.span = document.createElement('span')
    this.span.innerText = this.value[this.valueCount % this.value.length]
    this.count++
    document.body.appendChild(this.span)
    this.INIT_STATUS = {
      position  : 'absolute',
      top       : e.clientY - 20,
      left      : e.clientX - 10,
      fontSize  : '16px',
      lineHeight: '20px',
      color     : this.color,
      opacity   : 1
    }
    
    this.setSpan(this.INIT_STATUS)
  }
  
  setSpan(options) {
    for (let i in options) {
      if (i === 'top' || 'left' || 'right' || 'bottom') {
        this.span.style[i] = options[i] + 'px'
      }
      this.span.style[i] = options[i]
    }
    
    this.animateSpan()
  }
  
  animateSpan() {
    var count = 0
    this.span.timer = setInterval(() => {
      this.span.style.top = --this.INIT_STATUS.top + 'px'
      count++
      if (count % 10 === 0) {
        this.span.style.opacity = this.span.style.opacity - 0.1
      }
      if (count >= Number(this.distance)) {
        clearInterval(this.span.timer)
        document.body.removeChild(this.span)
        delete this.span
      }
    }, 10)
  }
}