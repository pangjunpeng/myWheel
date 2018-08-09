<template>
  <transition>
    <div class="main" v-if="isShow">
      {{msg}}
    </div>
  </transition>
</template>
<script>
  export default{
    name: 'popup',
    props: ['isShow','msg', 'time'],
    data(){
      return {}
    },
    updated(){
      setTimeout(() => {
        this.$emit('update:isShow', false)
      }, this.time * 1000)
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .main{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @header;
    z-index: 99999;
    line-height: @header;
    text-align: center;
    color: @colorWhite;
    background-color: @bgcolor;
  }
  .v-enter, .v-leave-to{
    opacity: 0;
  }
  .v-enter-active{
    transition: all 1s;
  }
  .v-leave-active {
    transition: all 3s;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
  }
</style>
