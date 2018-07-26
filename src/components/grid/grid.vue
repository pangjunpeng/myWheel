<template>
  <div>
    <div v-if="name">
      <icon :name="name" class="icon"></icon>
    </div>
    <div v-else class="slot-wrapper">
      <slot></slot>
    </div>
    <div class="desc">
      <p class="title">{{title}}</p>
      <p v-if="isBreak(desc)" class="detail" v-html="desc"></p>
      <p v-else class="detail">{{desc}}</p>
    </div>
    
  </div>
</template>
<script>
  import icon from '../icon/icon'
  export default{
    name: 'grid',
    components: {
      icon
    },
    props:['name', 'title', 'desc'],
    data(){
      return {}
    },
    methods: {
      isBreak(s){
        return s.match(/\<br\/?\>/)
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .icon{
    font-size: 3.5em;
  }
  .slot-wrapper{
    padding: 1em;
  }
  .desc {
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: .5rem;*/
    /*width: 100%;*/
    /*height: .6rem;*/
    width: 100%;
    margin-top: .4rem;
    white-space: nowrap;
    .title{
      line-height: .6rem;
      font-weight: 600;
    }
    .detail{
      line-height: .5rem;
      font-size: .8em;
      color: #888;
    }
  }
</style>
