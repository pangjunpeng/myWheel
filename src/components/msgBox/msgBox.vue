<template>
  <div>
    <transition name="mask">
      <div class="alert-mask" v-show="isShow"></div>
    </transition>
    <transition name="alert-main">
      <div class="alert-msg" v-show="isShow">
        <div class="alert-header" v-if="!isPrompt">提示</div>
        <div class="alert-header" v-else>请输入</div>
        <div class="alert-content">
          <div v-if="!isPrompt">{{msg}}</div>
          <div v-else><input type="text" v-model="content" ref="promptValue"></div>
        </div>
        <div class="alert-btns">
          <div v-if="!isAlert" class="cancel" @click="cancel">取消</div>
          <div class="ensure" @click="ensure">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    name    : 'alert',
    props   : {
      type  : {
        type   : String,
        default: 'alert'
      },
      isShow: {
        type   : Boolean,
        default: false
      },
      msg   : {
        type   : String,
        default: '说点什么吧'
      }
    },
    data(){
      return {
        content: ''
      }
    },
    methods : {
      ensure(){
        if (!this.isAlert) {
          this.$emit('result', this.result)
          if (this.isPrompt) {
            this.content = ''
          }
        }
        this.hide()
      },
      cancel(){
        this.$emit('result', false)
        this.hide()
      },
      hide(){
        this.$emit('update:isShow', false)
      }
    },
    computed: {
      isAlert(){
        return this.type === 'alert'
      },
      isPrompt(){
        return this.type === 'prompt'
      },
      isConfirm(){
        return this.type === 'confirm'
      },
      result(){
        if (this.isConfirm) {
          return true
        }
        if (this.isPrompt) {
          return this.content
        }
      }
    },
    watch:{
      isShow(a, b){
        if(a === true && this.type === 'prompt'){
          this.$nextTick(function(){
            this.$refs.promptValue.focus()
          })
        }
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .4);
  }

  .alert-msg {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
    width: 80%;
    transform: translate(-50%, -50%) scale(1);
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    .alert-header {
      font-weight: 800;
      padding-top: 15px;
    }
    .alert-content {
      color: #666;
      padding: 20px 10px;
      input {
        width: 80%;
        border: 1px solid #ccc;
      }
    }
    .alert-btns {
      display: flex;
      padding: 10px;
      border-top: 1px solid #e5e5e5;
      div {
        flex: 1;
      }
      .cancel {
        color: #999;
      }
      .ensure {
        color: rgb(38, 162, 255);
      }
    }
  }

  .mask-enter, .mask-leave-to {
    opacity: 0;
  }

  .mask-enter-to, .mask-leave {
    opacity: 1;
  }

  .mask-enter-active, .mask-leave-active {
    transition: all .2s;
  }
  
  .alert-main-enter {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }

  .alert-main-leave-to {
    opacity: 0
  }

  .alert-main-enter-to, .alert-main-leave {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1
  }

  .alert-main-enter-active, .alert-main-leave-active {
    transition: all .2s;
  }
</style>
