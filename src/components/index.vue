<template>
  <div class="wrapper">
    <div class="container">
      <div class="list clearfix">
        <div class="item" @click="switchMbSelect">
          <icon name="mb-select" class="icon"></icon>
          <p>移动端select效果</p>
        </div>
        <router-link class="item" to="/msgBox" tag="div">
          <icon name="msg" class="icon"></icon>
          <p>消息提示</p>
        </router-link>
        <div class="item" @click="switchAct">
          <icon name="actionsheet" class="icon"></icon>
          <p>actionsheet</p>
        </div>
        <div class="item" @click="switchSelect">
          <icon name="select" class="icon"></icon>
          <p>带图片的select</p>
        </div>
        <div class="item switch">
          <span :class="{'close': !isShowBubble}" @click="switchBubble"><i></i></span>
          <p>冒泡泡</p>
        </div>
      </div>
      <div class="main">
        <v-select
          :select-data="selectData"
          @selectInfo="getSelectInfo"
          v-show="isShowSelect"
          class="mt"></v-select>
        <actionsheet :opts="popupData" :isShow.sync="isShowAct" @handler="handlerAct"></actionsheet>
        <my-select :lists="lists" :isShow.sync="isShowMbSelect" @result="getRes" @msg="getTips"></my-select>
        <toast :isShowToast.sync="isShowToast" :msg="tipsMsg"></toast>
        <msg-box :type="msgType" :isShow.sync="alertShow" :msg="msg" @result="getMsg"></msg-box>
        <div v-show="resFlag" class="mt">
          获取到数据为
          <ul class="result-tb mt">
            <li v-for="(value, key, index) in result" :key="index">
              <span>{{key}}</span>
              <span>{{value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>我是底线</span>
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
  import icon from './icon/icon'
  export default{
    name: 'index',
    components: {
      vSelect: Select,
      Actionsheet,
      mySelect,
      toast,
      msgBox,
      icon
    },
    data(){
      return {
        result: undefined,
        resFlag: false,
        mouse: null,
        isShowBubble: true,
        isShowSelect: false,
        isShowAct: false,
        isShowMbSelect: false,
        isShowToast: false,
        s1Data: {},
        s2Data: {},
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
          {
            id   : 0,
            value: "item0",
            text : "默认0"
          },
          {
            id   : 1,
            value: "item1",
            text : "默认1"
          },
          {
            id   : 2,
            value: "item2",
            text : "默认2"
          },
          {
            id   : 3,
            value: "item3",
            text : "默认3"
          },
          {
            id   : 4,
            value: "item4",
            text : "默认4"
          },
          {
            id   : 5,
            value: "item5",
            text : "默认5"
          },
        ]
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
        this.result = this.s2Data.hasOwnProperty('id')
        if(!this.isShowMbSelect && this.resFlag){
          this.resFlag = true
        }else{
          this.resFlag = !this.resFlag
        }
        this.s2Data.hasOwnProperty('id') ? (this.resFlag = true) : (this.resFlag = false)
        this.isShowMbSelect = !this.isShowMbSelect
      },
      getTips(data){
        this.alert(data)
      },
      getRes(data){
        this.s2Data = data
        this.result = this.s2Data
        this.resFlag = true
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
      this.$ajax.get('https://easy-mock.com/mock/5afc27eb3379770340408b48/example/selectPciker')
        .then(res => {
          setTimeout(_=>{
            this.lists = res.data
          }, 3000)
        })
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
      
    },
    activated(){
      console.log('index activated')
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
  .wrapper{
    height: 100%;
    .container{
      min-height: 100%;
      padding: 2rem 1rem;
      max-width: 520px;
      margin: 0 auto;
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1rem;
      margin-top: -1rem;
      color: #999;
      span {
        padding: 0 .5rem;
      }
      &::before, &::after {
        content: '';
        display: inline-block;
        width: 30%;
        height: 1px;
        background-color: #ccc;
      }
    }
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
    border: 1px solid @borderColor;
    margin-top: -1px;
    margin-left: -1px;
    .icon{
      font-size: 3.5em;
    }
    &>p{
      height: .6rem;
      line-height: .6rem;
      position: absolute;
      bottom: .5rem;
    }
  }
  .switch{
    span{
      display: block;
      position: relative;
      width: 1.5rem;
      height: .75rem;
      margin: 0 auto;
      border-radius: .6rem;
      background: @color;
      transition: all .2s;
      &.close {
        background: @borderColor;
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
  .result-tb{
    li{
      display: flex;
      span{
        flex: 1;
        width: 50%;
        height: .6rem;
        line-height: .6rem;
        margin-left: -1px;
        margin-top: -1px;
        padding: 0 .2rem;
        overflow: auto;
        white-space: nowrap;
        border: 1px solid @borderColor;
        &:first-child{
          font-weight: 600;
        }
      }
    }
  }
  .mt{
    margin-top: .5rem;
  }
</style>
