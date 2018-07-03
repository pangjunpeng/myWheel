<template>
  <div>
    <div class="msg-wrapper">
      <input type="text" placeholder="请输入提示信息" v-model="inputMsg">
      <div class="item item-alert" @click="alert(msg)">打开alert提示框</div>
      <div class="item item-confirm" @click="confirm(msg)">打开confirm确认框</div>
      <div class="item item-prompt" @click="prompt">打开prompt输入框</div>
    </div>
    <msg-box :type="msgType" :isShow.sync="isMsgShow" :msg="sendMsg" @result="getMsg"></msg-box>
    <toast :isShowToast.sync="isShowToast" :msg="tipsMsg"></toast>
  </div>
</template>
<script>
  import msgBox from './msgBox.vue'
  import toast from '../toast/toast'

  export default{
    name: 'msgIndex',
    components: {
      msgBox,
      toast
    },
    data(){
      return {
        msgType: '',
        isMsgShow: false,
        isShowToast: false,
        inputMsg: '',
        sendMsg: '',
        tipsMsg: ''
      }
    },
    computed: {
      msg(){
        return this.inputMsg ? this.inputMsg : '请输入提示信息'
      }
    },
    methods: {
      getMsg(data){
        if(data){
          data === true ? this.toast('点了确定') : this.toast('输入了' + data)
        }else{
          this.toast('取消了')
        }
      },
      alert(msg){
        this.msgType = 'alert'
        this.sendMsg = msg
        this.isMsgShow = true
      },
      confirm(msg){
        this.msgType = 'confirm'
        this.sendMsg = msg
        this.isMsgShow = true
      },
      prompt(){
        this.msgType = 'prompt'
        this.isMsgShow = true
      },
      toast(msg){
        this.tipsMsg = msg
        this.isShowToast = true
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .msg-wrapper{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
    input{
      border: 1px solid;
      padding: .15rem;
      width: 80%;
      border-radius: 5px;
    }
    .item{
      margin: .6rem 0;
      border-radius: 5px;
      padding: .3rem 0;
      background: #a77ee8;
      border: 1px solid #8e6cc3;
      color: #fff;
    }
  }
</style>
