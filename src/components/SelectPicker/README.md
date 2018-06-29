待写，回家

使用
<my-select :isShow.sync="selectShow" @result="getRes"></my-select>

+ selectShow: 显隐标识
+ getRes: 选中的数据


import triggerScroll from './triggerScroll'

scrollTrigger({
	el: this.$refs.slideEl,
	target: this.$refs.slidePart,
	scrollX: false
}, function(res){
	console.log(res)
})