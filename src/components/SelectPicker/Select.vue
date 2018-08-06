<template>
  <div>
    <transition name="select-container">
      <div class="select-wrapper" v-show="isShow">
        <div class="select-header">
          <span class="select-title blod">地区选择</span>
          <span class="cancel" @click.stop="cancel">取消</span>
          <span class="ensure" @click.stop.prevent="pick">确定</span>
        </div>
        <div class="select-content">
          <ul class="select-main" ref="slidePart">
            <li class="select-item" v-for="(item,index) in lists" :key="item.id">{{item.text}}</li>
          </ul>
          <div class="white-shake" ref="slideEl" @click="alert"></div>
        </div>
      </div>
    </transition>
    <transition name="select-mask">
      <div class="select-bg" v-show="isShow" @click="cancel"></div>
    </transition>
  </div>
</template>
<script>
  import Spicker from './SelectPicker'
  export default{
    name: 'Select',
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      lists: {
        type: Array,
        default(){
          return []
        }
      },
      index: {
        type: [Number, String],
        default: 0
      }
    },
    data(){
      return {
        sRes: {}
      }
    },
    computed: {
      hasData(){
        return this.lists.length
      }
    },
    methods: {
      pick(){
        this.$emit('result', this.res)
        this.hide()
      },
      cancel(){
        this.hide()
      },
      hide(){
        this.$emit('update:isShow', false)
      },
      alert(){
        this.$emit('msg', '请切换至手机模式')
      },
      render(){
        let self = this
        var sPicker = new Spicker({
          el    : this.$refs.slideEl, // 滑动元素
          target: this.$refs.slidePart, // 被滑动元素
          index : this.index
        }, function (itemIndex) {
          self.res = self.lists[itemIndex] // 初始化完成，返回了第几个
        })
        sPicker.scrollTrigger({
          scrollX: false, // 可开启x轴和y轴 可滑动
        }, function (res) {
          let index = res.index // 滑动到第几个元素上
          self.res = self.lists[index]
        })
      }
    },
    updated(){
      this.hasData && this.render()
    },
  }
</script>
<style scoped type="text/less" lang="less">
  .blod{
    font-weight: 800;
  }
  .select-wrapper{
    width: 100%;
    height: 200px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    .select-header{
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: -40px;
      z-index: 2;
      border-bottom: 1px solid @borderColor;
      background-color: #fff;
      .select-title, .cancel, .ensure{
        position: absolute;
        text-align: center;
        width: 30%;
      }
      .select-title{
        width: 100%;
      }
      .cancel{
        left: 0;
        color: #666;
      }
      .ensure{
        right: 0;
        color: #1e83d3;
      }
    }
    .select-content{
      height: 100%;
      overflow: auto;
      .select-main{
        text-align: center;
        transition: all .2s;
        .select-item{
          height: 40px;
          line-height: 40px;
          transition: all .2s;
        }
      }
      .white-shake{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(204, 204, 204, .5) 0%, rgba(255, 255, 255, 0) 50%, rgba(204, 204, 204, .5) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#80000000', GradientType=0); /* IE6-9 */
        &::before, &::after{
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          width: 100%;
          height: 1px;
          background-color: @borderColor;
        }
        &::before {
          transform: translateY(-20px);
        }
        &::after {
          transform: translateY(20px);
        }
      }
    }
  }
  
  
  
  
  
  .select-bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, .4);
  }
  .select-container-enter, .select-container-leave-to {
    bottom: -240px;
  }

  .select-container-enter-to, .select-container-leave {
    bottom: 0px;
  }

  .select-container-enter-active, .select-container-leave-active {
    transition: bottom .2s;
  }

  .select-mask-enter, .select-mask-leave-to {
    opacity: 0
  }

  .select-mask-enter-to, .select-mask-leave {
    opacity: 1
  }

  .select-mask-enter-active, .select-mask-leave-active {
    transition: opacity .2s;
  }
</style>
