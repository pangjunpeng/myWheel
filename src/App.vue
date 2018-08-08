<template>
  <div id="app">
    <div class="header">
      <transition>
        <router-link v-if="isShowBack" class="header-back" tag="div" to="/">
          <i class="iconfont icon-goback"></i>
        </router-link>
      </transition>
      <div class="header-title">{{this.$route.meta.title}}</div>
      <div class="header-logo" @click="showConcat">
        <i class="iconfont icon-contact"></i>
      </div>
    </div>
    <transition :name="transitionName">
        <keep-alive>
          <router-view class="child-view"/>
        </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      routeSwitch: 'slide-next',
      transitionName: ''
    }
  },
  computed: {
    isShowBack(){
      return this.$route.path !== '/'
    },
  },
  methods: {
    countDepth(s){
      if(s === '/'){
        return 1
      }
      return s.split('/').length
    },
    showConcat(){
      alert('马上添加')
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = this.countDepth(to.path)
      const fromDepth = this.countDepth(from.path)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
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


  .child-view {
    position: absolute;
    transition: all .5s;
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
