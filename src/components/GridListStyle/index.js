/*
 * 类似list-style的小四块
 * 使用方法：
 * new GridListStyle({
      el: '.list-style',
      side: '12px'
    })
 */


function GridListStyle(params){
  Object.assign(this, params)
  this.createListStyle(this.el, this.side)
}
GridListStyle.prototype.createListStyle = function(el, side){
  var el = this.getEl(el)
  if(!el || Object.prototype.toString.call(el).match('NodeList') && el.length === 0){
	console.log('未发现此元素')
	return false
  }
  if (!el.length) {
	this.makeListStyle(el, side)
  } else {
	for (var i = 0; i < el.length; i++) {
	  this.makeListStyle(el[i], side)
	}
  }
}
GridListStyle.prototype.makeListStyle = function (el, side) {
  el.style.cssText = 'display:inline-block;margin-right:10px;transform: rotate(45deg);font-size: 0;'
  var pHeight = this.getStyle(el.parentNode).height
  if (side) {
	el.style.width = el.style.height = side
  } else {
	el.style.width = el.style.height = pHeight.slice(0, pHeight.length - 2) / 2 + 'px'
  }
  el.innerHTML = '<i></i><i></i><i></i><i></i>'
  el.childNodes.forEach(function (item) {
	item.style.cssText = 'display: inline-block;width:34%;height:34%;margin:8%;background:#000;'
  })
}
GridListStyle.prototype.getEl = function(el){
  if (el.startsWith('#')) {
	return document.querySelector(el)
  } else if (el.startsWith('.')) {
	return document.querySelectorAll(el)
  } else {
	return document.querySelectorAll(el)
  }
}
GridListStyle.prototype.getStyle = function(ele){
  return window.getComputedStyle ? window.getComputedStyle(ele, null) : ele.currentStyle
}