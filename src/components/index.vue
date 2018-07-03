<template>
  <div class="container">
    <div class="list clearfix">
      <div class="item img" @click="switchMbSelect">
        <img :src="mbSelectImg" alt="手机select">
        <p>仿手机原生select</p>
      </div>
      <div class="item img" @click="switchAct">
        <img :src="actionsheetImg" alt="actionsheet提示">
        <p>actionsheet</p>
      </div>
      <div class="item img" @click="switchSelect">
        <img :src="selectImg" alt="带图select">
        <p>带图片的select</p>
      </div>
      <div class="item img" @click="switchSelect">
        <img :src="msgImg" alt="消息提示">
        <p>消息提示</p>
      </div>
      <div class="item switch">
        <span :class="{'close': !isShowBubble}" @click="switchBubble"><i></i></span>
        <p>冒泡泡</p>
      </div>
    </div>
    <div class="main mt">
      <v-select
        :select-data="selectData"
        @selectInfo="getSelectInfo"
        v-show="isShowSelect"></v-select>
      <actionsheet :opts="popupData" :isShow.sync="isShowAct" @handler="handlerAct"></actionsheet>
      <my-select :lists="lists" :isShow.sync="isShowMbSelect" @result="getRes" @msg="getTips"></my-select>
      <toast :isShowToast.sync="isShowToast" :msg="tipsMsg"></toast>
      <msg-box :type="msgType" :isShow.sync="alertShow" :msg="msg" @result="getMsg"></msg-box>
      <p v-show="resFlag" class="mt">获取到数据为 {{result}}</p>
    </div>
  </div>
</template>
<script>
  import MouseBubble from './mouse-click-bubble/'
  import Select from './vue-select/Select'
  import VConsole from './my_vConsole/lib/vconsole.min'
  import Actionsheet from './vue-actionsheet/actionsheet'
  import mySelect from './SelectPicker/Select'
  import toast from './toast/toast'
  import msgBox from './msgBox/msgBox'
  export default{
    name: 'index',
    components: {
      vSelect: Select,
      Actionsheet,
      mySelect,
      toast,
      msgBox
    },
    data(){
      return {
        result: {},
        resFlag: false,
        mouse: null,
        isShowBubble: true,
        isShowSelect: false,
        isShowAct: false,
        isShowMbSelect: false,
        isShowToast: false,
        s1Data: {},
        s2Data: {},
        selectImg: '',
        msgImg: '',
        actionsheetImg: '',
        mbSelectImg: '',
        tipsMsg: '',
        msgType: '',
        alertShow: false,
        msg: '说点什么呢',
        bankLists: [
          {
          'branchId'  : '48484848448',
          'bankName'  : '招商银行',
          'acNo'      : '6225768639338661',
          'phoneNo'   : '15811251758',
          'bankactype': 'PEBC',
          'bankId'    : '3081000',
          'acseq'     : 11594
        }, {
          'branchId'  : '308100005133',
          'bankName'  : '建设银行',
          'acNo'      : '6225768639338662',
          'phoneNo'   : '15811251758',
          'bankactype': 'PEBC',
          'bankId'    : '3081000',
          'acseq'     : 11594
        }, {
          'branchId'  : '105100001036',
          'bankName'  : '工商银行',
          'acNo'      : '6225768639338663',
          'phoneNo'   : '15811251758',
          'bankactype': 'PEBC',
          'bankId'    : '3081000',
          'acseq'     : 11594
        }],
        popupData: [{
          text      : '行内转账',
          cssClasses: 'content',
          handler   : function () {
            this.toast('您选择了行内转账~')
          }
        }, {
          text      : '跨行转账',
          cssClasses: 'content',
          handler   : function () {
            this.toast('您选择了跨行转账~')
          }
        }],
        lists: [
          {id: 0, value: "item0", text: "选项1"},
          {id: 1, value: "item1", text: "选项2"},
          {id: 2, value: "item2", text: "选项3"},
          {id: 3, value: "item3", text: "选项4"},
          {id: 4, value: "item4", text: "选项5"},
          {id: 5, value: "item5", text: "选项6"},
          {id: 6, value: "item6", text: "选项7"},
          {id: 7, value: "item7", text: "选项8"},
          {id: 8, value: "item8", text: "选项9"},
          {id: 9, value: "item9", text: "选项10"}],
      }
    },
    computed: {
      selectData() {
        for (let i of this.bankLists) {
          i.logo = require('./vue-select/img/' + i.branchId + '.png')
        }
        return this.bankLists
      },
      isPc(){
        return navigator.userAgent.match('Mobile')
      }
    },
    methods: {
      switchBubble(){
        if(this.isShowBubble){
          this.closeBubble()
        }else{
          this.openBubble()
        }
        this.isShowBubble = !this.isShowBubble
      },
      switchSelect(){
        this.result = this.s1Data
        if(!this.isShowSelect && this.resFlag){
          this.resFlag = true
        }else{
          this.resFlag = !this.resFlag
        }
        this.isShowSelect = !this.isShowSelect
      },
      switchAct(){
        this.isShowAct = !this.isShowAct
      },
      switchMbSelect(){
        this.isShowSelect = false
        this.result = this.s2Data
        if(!this.isShowMbSelect && this.resFlag){
          this.resFlag = true
        }else{
          this.resFlag = !this.resFlag
        }
        this.isShowMbSelect = !this.isShowMbSelect
      },
      getTips(data){
        this.alert(data)
      },
      getRes(data){
        this.s2Data = data
        this.result = this.s2Data
      },
      openBubble(){
        this.mouse.add()
      },
      closeBubble(){
        this.mouse.remove()
      },
      getSelectInfo(data){
        this.s1Data = data
        this.result = this.s1Data
      },
      handlerAct(data){
        data.call(this)
      },
      toast(msg){
        this.isShowToast = true
        this.tipsMsg = msg.toString()
      },
      alert(msg){
        this.msgType = 'alert'
        this.msg = msg
        this.alertShow = true
      },
      prompt(){
        this.msgType = 'prompt'
        this.alertShow = true
      },
      confirm(msg){
        this.msgType = 'confirm'
        this.msg = msg
        this.alertShow = true
      },
      getMsg(data){
        console.log(data)
      }
    },
    created(){
      this.selectImg = require('../assets/img/popup.png')
      this.actionsheetImg = require('../assets/img/actionSheet.png')
      this.mbSelectImg = require('../assets/img/select.png')
      this.msgImg = require('../assets/img/msg.png')
  
      this.mouse = new MouseBubble()
    },
    mounted(){
      if(this.isPc){
        this.toast('快速点击左下角5次可调出vconsole哦~')
      }else{
        this.toast('手机访问效果更佳哦~')
        console.log('欢迎欢迎~')
        console.log("%c", "padding:50px;background:url('https://upload-images.jianshu.io/upload_images/11264410-e6f607b0d522c693.gif');background-size:auto 100%;");
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  .clearfix::after{
    content: '';
    display: table;
    height: 0;
    clear: both;
  }
  .container{
    padding: 1rem;
    max-width: 520px;
    margin: 0 auto;
  }
  .item{
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
    border: 1px solid #ccc;
    margin-top: -1px;
    margin-left: -1px;
    &>span, &>img{
      width: 1.5rem;
    }
    &>p{
      position: absolute;
      bottom: .5rem;
      white-space: nowrap;
    }
  }
  .switch{
    span{
      display: block;
      position: relative;
      height: .75rem;
      margin: 0 auto;
      border-radius: .6rem;
      background: #a77ee8;
      &.close {
        background: #ccc;
        i{
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
  .mt{
    margin-top: .5rem;
  }
</style>
