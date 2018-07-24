<template>
  <div class="list clearfix">
      <div class="item" @click="switchMbSelect">
        <grid name="mb-select" desc="移动端select效果"></grid>
      </div>
      <router-link class="item" to="/msgBox" tag="div">
        <grid name="msg" desc="消息提示"></grid>
      </router-link>
      <div class="item" @click="switchAct">
        <grid name="actionsheet" desc="actionsheet"></grid>
      </div>
      <div class="item" @click="switchSelect">
        <grid name="select" desc="带图片的select"></grid>
      </div>
      <div class="item switch">
        <grid desc="带图片的select">
          <span :class="{'close': !isShowBubble}" @click="switchBubble"><i></i></span>
        </grid>
      </div>
    </div>
</template>
<script>
  import grid from '../grid/grid'
  export default{
    name: 'list',
    components: {
      grid
    },
    data(){
      return {}
    },
  }
</script>
<style scoped type="text/less" lang="less">
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    float: left;
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    text-align: center;
    border: 1px solid @borderColor;
    margin-top: -1px;
    margin-left: -1px;
    .icon {
      font-size: 3.5em;
    }
    & > p {
      height: .6rem;
      line-height: .6rem;
      position: absolute;
      bottom: .5rem;
    }
  }
  
  .switch {
    span {
      display: block;
      position: relative;
      width: 1.5rem;
      height: .75rem;
      margin: 0 auto;
      border-radius: .6rem;
      background: @color;
      transition: all .2s;
      &.close {
        background: @hoverBgColor;
        i {
          right: .75rem;
        }
      }
      i {
        position: absolute;
        right: 0;
        display: inline-block;
        width: .75rem;
        height: .75rem;
        background: #fff;
        border-radius: 50%;
        transition: all .2s;
      }
    }
  }
</style>
