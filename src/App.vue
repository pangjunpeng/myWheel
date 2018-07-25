<template>
  <div id="app">
    <div class="header">
      <transition>
        <router-link v-if="isShowBack" class="header-back" tag="div" to="/">
          <i class="iconfont icon-goback"></i>
        </router-link>
      </transition>
      <div class="header-title">{{this.$route.meta.title}}</div>
      <div class="header-logo">
        <i class="iconfont icon-contact"></i>
      </div>
    </div>
    <transition :name="routeSwitch">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      routeSwitch: 'slide-next'
    }
  },
  computed: {
    isShowBack(){
      return this.$route.path !== '/'
    }
  },
  watch: {
    '$route'(to, from){
      if(to.name === 'Index'){
        this.routeSwitch = 'slide-pre'
      }else{
        this.routeSwitch = 'slide-next'
      }
    }
  }
}
</script>

<style scope type="text/less" lang="less">
  html{
    background-color: #f7f7f7;
  }
  html, body, #app{
    height: 100%;
  }
  #app{
    font-size: .4rem;
    .header{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid @borderColor;
      background-color: #fff;
      .header-title{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 1.3em;
      }
      .header-back, .header-logo{
        position: absolute;
        top: 0;
        width: 50px;
        height: 100%;
        line-height: 50px;
        text-align: center;
        i{
          font-size: 1.3em;
          color: @color;
        }
      }
      .header-back{
        left: 0;
      }
      .header-logo{
        right: 0;
      }
    }
  }
  
  .v-enter, .v-leave-to{
    opacity: 0;
  }
  .v-enter-active, .v-leave-active{
    transition: opacity .2s;
  }
  .slide-next, .slide-pre {
    position: absolute;
    left: 0;
    right: 0;
  }

  .slide-next-enter-active, .slide-pre-enter-active, .slide-next-leave-active, .slide-pre-leave-active {
    transition: all .8s ease;
  }

  .slide-next-enter, .slide-pre-leave {
    transform: translateX(50px);
    opacity: 0;
  }

  .slide-pre-enter, .slide-next-leave {
    transform: translateX(-50px);
    opacity: 0;
  }
</style>
