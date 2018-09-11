<template>
  <div class="concat-container">
    <div v-show="isShow" class="concat-wrapper">
      <div v-for="(item, index) in info" :key="index" class="item-wrapper" v-hover="hoverClass">
        <a :href="item.href"  class="concat-item">
          <i v-if="item.icon" class="iconfont" :class="`icon-${item.icon}`"></i>
          <span class="detail" :class="{'text-center-bold': !item.icon}">{{item.value}}</span>
        </a>
      </div>
      
    </div>
    
    <div v-show="isShow" class="msk" @click.prevent="hideConcat"></div>
  </div>
</template>
<script>
  export default{
    name: 'index',
    props: ['isShow'],
    data(){
      return {
        info: [{
          title: 'tel',
          href: 'tel:18435155822',
          value: '18435155822',
          icon: 'tel'
        }, {
          title: 'email',
          href: 'mailto:justdoit0212@163.com',
          value: 'justdoit0212@163.com',
          icon: 'email'
        }, {
          title: 'github',
          href: 'https://github.com/pangjunpeng',
          value: 'pangjunpeng(庞军鹏)',
          icon: 'github'
        }, {
          title: 'blog',
          href: 'https://pangjunpeng.com',
          value: 'blog',
          icon: 'blog'
        }, {
          title: 'resume',
          href : 'https://pangjunpeng.com/resume/',
          value: 'resume',
          icon: 'resume'
        }, {
          title: 'tips',
          href: 'https://github.com/pangjunpeng/myWheels/issues',
          value: '欢迎提bug'
        }],
        hoverClass: {
          pc: 'concat-hover',
          mb: 'concat-hover-mb',
          time: 100
        }
      }
    },
    methods: {
      hideConcat(){
        this.$emit('update:isShow', false)
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .concat-container{
    background-color: #f9f9f9;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .item-wrapper{
      padding: 0 .28rem;
      
      .concat-item {
        padding: .28rem 0;
        flex-grow: 1;
        display: flex;
        align-items: center;
        border-bottom: 1px solid @borderColor;
        color: @color;
        .iconfont {
          width: .8rem;
          text-align: center;
          font-size: 1.38em;
        }
        .detail {
          flex: 5;
        }
      }
    }
    .msk {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -2;
      background-color: rgba(0, 0, 0, 0);
    }
  }
  
  .text-center-bold{
    font-weight: 700;
    text-align: center;
  }
  .concat-hover:hover{
    background-color: #eee;
  }
  .concat-hover-mb{
    background-color: #eee;
  }
</style>
