<template>
  <div class="select-wrapper" ref="header">
    <div ref="mask" class="mask">
      <div class="select-container">
        <div class="payway">收款方式：</div>
        <div class="downmenu">
          <div
            class="show"
            @click="show=!show">
            <img :src="selectData[menueIndex].logo" class="logo">
            {{ selectData[menueIndex].bankName }}
          </div>
          <transition :name="listFade" @enter="enter" @after-leave="afterLeave">
            <div
              v-show="show"
              :class="showList" @click="hideBg" ref="main">
              <ul>
                <li
                  v-for="(item, index) in selectData"
                  :key="index"
                  @click.prevent="selectMenu(index)">
                  <img :src="item.logo" class="logo">
                  {{ item.bankName }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Select',
    props: {
      selectData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        menueIndex: 0,
        show: false,
        deviceType: '',
      }
    },
    computed: {
      showList(){
        return (this.deviceType === 'pc') ? 'pc-list' : 'mb-list'
      },
      listFade(){
        return (this.deviceType === 'pc') ? 'pc-fade' : 'mb-fade'
      },
      isPc(){
        return this.deviceType === 'pc'
      }
    },
    created(){
      this.deviceType = (window.navigator.userAgent.indexOf('Mobile') < 0) ? 'pc' : 'mobile'
      this.$emit('selectInfo', this.selectData[0])
    },
    methods: {
      selectMenu(index) {
        this.menueIndex = index
        this.show = false
        this.$emit('selectInfo', this.selectData[index])
      },
      hideBg(){
        this.show = false
      },
      enter(){
        if(this.isPc){
          this.$refs.mask.style.height = +this.getStyle(this.$refs.header, 'height') + +this.getStyle(this.$refs.main, 'height') + 'px'
        }
      },
      afterLeave(){
        if (this.isPc) {
          this.$refs.mask.style.height = 'auto'
        }
      },
      getStyle(el, attr){
        if (el.style[attr]) {
          return el.style[attr].replace('px', '')
        }
        if (window.getComputedStyle) {
          return getComputedStyle(el, false)[attr].replace('px', '')
        } else {
          return el.currentStyle[attr].replace('px', '')
        }
        return [el, attr]
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .select-wrapper{
    position: relative;
    height: 30px;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .select-container {
    display: flex;
    position: relative;
    padding-left: 10px;
    border: 1px solid @borderColor;
    background-color: #fff;
  }
  .payway {
    flex: 2;
    align-self: center;
  }
  .downmenu {
    flex: 4;
    border: none;
    position: relative;
    .show {
      height: 30px;
      line-height: 20px;
      cursor: default;
      position: relative;
      z-index: 2;
      padding: 5px 15px;
      background-color: #fff;
      background-image: url("img/arrow.png");
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: right center;
      .logo{
        height: 100%;
        vertical-align: top;
        margin-right: 10px;
      }
    }
    .pc-list {
      position: absolute;
      top: 30px;
      left: 0;
      z-index: 1;
      width: 100%;
      border: 1px solid @borderColor;
      background-color: #fff;
      ul{
        max-height: 200px;
        overflow: auto;
        li {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          height: 20px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          cursor: default;
          .logo {
            height: 100%;
            vertical-align: top;
            margin-right: 10px;
          }
          &:hover {
            background-color: #f5f5f5;
          }
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .mb-list{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0,0,0,.5);
      ul{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        padding: 10px 0;
        background: #fff;
        max-height: 250px;
        overflow: auto;
        li {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          cursor: default;
          .logo {
            margin-right: 10px;
            height: 100%;
            vertical-align: top;
          }
          &:hover {
            background-color: #f5f5f5;
          }
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
  }
  
  .pc-fade-enter, .pc-fade-leave-to {
    transform: translateY(-100%);
  }
  .pc-fade-enter-active, .pc-fade-leave-active {
    transition: all .3s;
  }
  .pc-fade-enter-to, .pc-fade-leave {
    transform: translateY(0);
  }
  .mb-fade-enter, .mb-fade-leave-to{
    opacity: 0;
  }
  .mb-fade-enter-active, .mb-fade-leave-active {
    transition: opacity .2s;
  }
  .mb-fade-enter-to, .mb-fade-leave {
    opacity: 1;
  }
</style>
