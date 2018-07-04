<template>
  <div id="app">
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
    background-color: #fafafa;
  }
  html, body, #app{
    height: 100%;
  }
  #app{
    font-size: .4rem;
  }

  .slide-next, .slide-pre {
    position: absolute;
    left: 0;
    right: 0;
  }

  .slide-next-enter-active, .slide-pre-enter-active {
    transition: all 1.2s ease;
  }

  .slide-next-enter {
    left: 0;
    right: 0;
    transform: translateX(50px);
    opacity: 0;
  }

  .slide-pre-enter {
    left: 0;
    right: 0;
    transform: translateX(-50px);
    opacity: 0;
  }
</style>
