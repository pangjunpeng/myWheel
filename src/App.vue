<template>
  <div id="app">
    <div class="header-wrapper">
      <div class="header" @click="isConcatShow=false">
        <transition>
          <router-link v-if="isShowBack" class="header-back" tag="div" to="/">
            <i class="iconfont icon-goback"></i>
          </router-link>
        </transition>
        <div class="header-title">{{title}}</div>
        <div class="header-logo" @click.stop="showConcat">
          <i class="iconfont icon-contact"></i>
        </div>
      </div>
      <concat class="concat" :isShow.sync="isConcatShow"></concat>
    </div>
    
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import concat from './components/concat/concat'
  export default {
    name    : 'App',
    components: {
      concat
    },
    data(){
      return {
        routeSwitch   : 'slide-next',
        transitionName: '',
        isConcatShow: false
      }
    },
    computed: {
      title(){
        return this.$route.meta.title
      },
      isShowBack(){
        return this.$route.path !== '/'
      },
    },
    methods : {
      countDepth(s){
        if (s === '/') {
          return 1
        }
        return s.split('/').length
      },
      showConcat(){
        this.isConcatShow = !this.isConcatShow
      }
    },
    created(){
      // 挂载共用方法到dom
      HTMLElement.prototype.addClass = function (cName) {
        this.classList.add(cName)
//        let aCName = cName.split(' ').filter(item => {
//          return item
//        })
//        aCName.forEach(item => {
//          if (this.className.indexOf(item) === -1) {
//            this.className += ` ${item} `
//          }
//        })
      }
      HTMLElement.prototype.removeClass = function (cName) {
        this.classList.remove(cName)
//        let reg = new RegExp('\\b' + cName + '\\b ', 'g')
//        this.className = this.className.replace(reg, '')
      }
    },
    watch   : {
      '$route' (to, from) {
        const toDepth = this.countDepth(to.path)
        const fromDepth = this.countDepth(from.path)
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
  }
</script>

<style scope type="text/less" lang="less">
  html {
    background-color: #f7f7f7;
    user-select: none;
  }
  
  html, body, #app {
    height: 100%;
  }
  
  #app {
    font-size: .4rem;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: @header;
      border-bottom: 1px solid @borderColor;
      background-color: #fff;
      .header-title {
        height: @header;
        line-height: @header;
        text-align: center;
        font-size: 1.3em;
      }
      .header-back, .header-logo {
        position: absolute;
        top: 0;
        width: @header;
        height: 100%;
        line-height: @header;
        text-align: center;
        i {
          font-size: 1.3em;
          color: @color;
        }
      }
      .header-back {
        left: 0;
      }
      .header-logo {
        right: 0;
      }
    }
    .concat{
      position: fixed;
      top: @header;
      right: .4rem;
      z-index: 1;
    }
  }
  
  .v-enter, .v-leave-to {
    opacity: 0;
  }
  
  .v-enter-active, .v-leave-active {
    transition: opacity .2s;
  }
  
  .child-view {
    width: 100%;
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
