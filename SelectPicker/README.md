待写，回家

import triggerScroll from './triggerScroll'

scrollTrigger({
	el: this.$refs.slideEl,
	target: this.$refs.slidePart,
	scrollX: false
}, function(res){
	console.log(res)
})