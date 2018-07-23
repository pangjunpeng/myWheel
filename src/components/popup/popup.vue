<template>
  <div class="main">
    {{}}
  </div>
</template>
<script>
  export default{
    name: 'popup',
    data(){
      return {}
    },
  }
</script>
<style scoped type="text/less" lang="less">
  .main{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 99999;
    line-height: 50px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
  }
  
</style>
