<template>
  <transition name="toast">
    <div class="toast-wrapper" v-show="isShowToast">
      <span class="toast-main">{{msg}}</span>
    </div>
  </transition>
</template>
<script>
  export default{
    name: 'toast',
    props: {
      isShowToast: {
        type: Boolean,
        default: true
      },
      msg: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
      }
    },
    watch: {
      isShowToast(newVal){
        if(newVal === true){
          setTimeout(() => {
            this.$emit('update:isShowToast', false)
          }, 2000)
        }
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .toast-wrapper{
    position: fixed;
    bottom: 100px;
    left: 50%;
    z-index: 999;
    max-width: 80%;
    transform: translateX(-50%);
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 15px;
    background-color: #333;
    color: @colorWhite;
  }
  .toast-enter-active{
    animation: enter 1s;
  }
  .toast-leave-active{
    animation: leave 2s;
  }
  @keyframes enter {
    0%{
      opacity: 0;
      bottom: 50px;
    }
    100%{
      opacity: 1;
      bottom: 100px;
    }
  }
  @keyframes leave {
    0%{
      opacity: 1;
      bottom: 100px;
    }
    100%{
      opacity: 0;
      bottom: 100px;
    }
  }
</style>
