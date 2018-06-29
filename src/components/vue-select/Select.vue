<template>
  <div class="select-container">
    <div class="payway">收款方式：</div>
    <div class="downmenu">
      <div
        class="show"
        @click="show=!show">
        <img :src="selectData[menueIndex].logo" class="logo">
        {{ selectData[menueIndex].bankName }}
      </div>
      <transition :name="listFade">
        <div
          v-show="show"
          :class="showList" @click="hideBg">
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
        deviceType: ''
      }
    },
    computed: {
      showList(){
        return (this.deviceType === 'pc') ? 'pc-list' : 'mb-list'
      },
      listFade(){
        return (this.deviceType === 'pc') ? 'pc-fade' : 'mb-fade'
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
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .select-container {
    display: flex;
    border: 1px solid #ccc;
  }
  .payway {
    flex: 2;
    align-self: center;
  }
  .downmenu {
    flex: 5;
    border: none;
    position: relative;
    .show {
      height: 30px;
      line-height: 20px;
      cursor: default;
      position: relative;
      padding: 5px 15px;
      background-color: #fff;
      background-image: url("img/arrow.png");
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: right center;
      .logo{
        height: 100%;
        vertical-align: top;
      }
    }
    .pc-list {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: -1;
      width: 100%;
      border: 1px solid #ccc;
      background-color: #fff;
      ul > li {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #eee;
        cursor: default;
        .logo {
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
        width: 60%;
        background: #fff;
        li {
          display: flex;
          align-items: center;
          padding: 5px 15px;
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
