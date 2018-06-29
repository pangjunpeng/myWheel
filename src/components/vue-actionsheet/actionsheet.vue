<template>
  <div>
    <transition name="popup-container">
      <div class="popup-wrapper" v-show="isShow">
        <div class="popup-content">
        <span class="popup-item"
              v-for="(item, index) in opts"
              :class="item.cssClasses"
              @click.stop="itemClick(item.handler)"
              :key="index">
          {{item.text}}
        </span>
        </div>
        <span class="cancel" @click.stop="closePopup" v-if="hasData">取消</span>
      </div>
    </transition>
    <transition name="popup-mask">
      <div class="popup-bg" v-show="isShow" @click.stop="closePopup"></div>
    </transition>
  </div>
</template>
<script>
  export default{
    name: 'Popup',
    props: {
      opts: {
        type: Array,
        default(){
          return []
        }
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        showPop: false
      }
    },
    methods: {
      itemClick(handler){
        if(handler && typeof handler === 'function'){
          handler()
        }
        this.closePopup()
      },
      closePopup(){
        this.$emit('update:isShow', !this.isShow)
      }
    },
    computed: {
      hasData(){
        return this.opts.length
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .item-class{
    display: block;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #fff;
  }
  .border-radius{
    border-radius: 5px;
  }

  .popup-wrapper {
    position: absolute;
    bottom: 5px;
    left: 2%;
    right: 2%;
    z-index: 999;
    .popup-content {
      .border-radius;
      span {
        .item-class;
      }
    }
    .cancel {
      .item-class;
      .border-radius;
      margin-top: 10px;
    }
  }
  .popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, .4);
  }

  .popup-container-enter, .popup-container-leave-to {
    bottom: -150px;
  }
  .popup-container-enter-to, .popup-container-leave {
    bottom: 5px;
  }
  .popup-container-enter-active, .popup-container-leave-active {
    transition: bottom .2s;
  }
  .popup-mask-enter, .popup-mask-leave-to {
    opacity: 0
  }
  .popup-mask-enter-to, .popup-mask-leave {
    opacity: 1
  }
  .popup-mask-enter-active, .popup-mask-leave-active {
    transition: opacity .2s;
  }
</style>
