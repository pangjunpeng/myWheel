<template>

</template>
<script>
  import grid from '../grid/grid'
  export default{
    name: 'list',
    components: {
      grid
    },
    data(){
      return {
        resFlag       : false,
        mouse         : null,
        isShowBubble  : true,
        isShowSelect  : false,
        isShowAct     : false,
        isShowMbSelect: false,
        isShowToast   : false,
        isShowPopup   : false,
        s1Data        : {},
        s2Data        : {},
        tipsMsg       : '',
        msgType       : '',
        alertShow     : false,
        msg           : '说点什么呢',
        popMsg        : '',
        showPopTime   : 0,
      }
    },
    methods: {
    
    }
  }
</script>
<style scoped type="text/less" lang="less">

</style>
