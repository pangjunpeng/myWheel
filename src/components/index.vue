<template>
  <div class="wrapper">
    <div class="container">
      <div class="list clearfix">
        <div class="item" @click="switchMbSelect" v-hover="hoverClass">
          <grid name="mb-select" title="SelectPicker" desc="移动端select效果"></grid>
        </div>
        <router-link class="item" to="/city" tag="div" v-hover="hoverClass">
          <grid name="city-list" title="CityList" desc="城市选择组件<br>当前: 请选择"></grid>
        </router-link>
        <router-link class="item" to="/msgBox" tag="div" v-hover="hoverClass">
          <grid name="msg" title="MsgBox" desc="消息提示"></grid>
        </router-link>
        <div class="item" @click="switchAct" v-hover="hoverClass">
          <grid name="actionsheet" title="actionsheet" desc="一个弹出选择器"></grid>
        </div>
        <div class="item" @click="switchSelect" v-hover="hoverClass">
          <grid name="select" title="selector" desc="可以带图片的selector<br>适配移动和pc(下方展示)"></grid>
        </div>
        <div class="item switch" v-hover="hoverClass">
          <grid title="冒泡泡" desc="没事写的点击冒泡小插件">
            <span :class="{'close': !isShowBubble}" @click="switchBubble"><i></i></span>
          </grid>
        </div>
      </div>
      <div class="main">
        <v-select
          :select-data="selectData"
          @selectInfo="getSelectInfo"
          v-show="isShowSelect"
          class="mt"></v-select>
        <actionsheet
          :opts="popupData"
          :isShow.sync="isShowAct"
          @handler="handlerAct"
        ></actionsheet>
        <my-select
          :lists="lists"
          :isShow.sync="isShowMbSelect"
          @result="getRes"
          @msg="getTips"
        ></my-select>
        <toast
          :isShowToast.sync="isShowToast"
          :msg="tipsMsg"
        ></toast>
        <msg-box
          :type="msgType"
          :isShow.sync="alertShow"
          :msg="msg"
          @result="getMsg"
        ></msg-box>
        <popup
          :isShow.sync="isShowPopup"
          :msg="popMsg"
          :time="showPopTime"></popup>
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
  import Actionsheet from './vue-actionsheet/actionsheet'
  import VConsole from './my_vConsole/lib/vconsole.min'
  import mySelect from './SelectPicker/Select'
  import Select from './vue-select/Select'
  import msgBox from './msgBox/msgBox'
  import toast from './toast/toast'
  import popup from './popup/popup'
  import icon from './icon/icon'
  import grid from './grid/grid'
  export default{
    name: 'index',
    components: {
      vSelect: Select,
      Actionsheet,
      mySelect,
      msgBox,
      popup,
      toast,
      grid,
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
        isShowPopup: false,
        s1Data: {},
        s2Data: {},
        tipsMsg: '',
        msgType: '',
        alertShow: false,
        msg: '说点什么呢',
        popMsg: '',
        showPopTime: 0,
        hoverClass: 'v-hover-hover',
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
          text      : '阳春布德泽',
          cssClasses: 'content',
          handler   : function () {
            this.toast('万物生光辉')
          }
        }, {
          text      : '常恐秋节至',
          cssClasses: 'content',
          handler   : function () {
            this.toast('焜黄华叶衰')
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
        return !navigator.userAgent.match('Mobile')
      }
    },
    directives: {
      hover: {
        inserted(el, binding, vnode){
          let self = vnode.context
          if(self.isPc){
            if (el.className.indexOf('v-hover-enable') === -1) {
              el.className += ' v-hover-enable '
            }
          }else{
            let hClass = binding.value

            el.ontouchstart = e => {
              el.addClass(hClass)
              setTimeout(function(){
                el.removeClass(hClass)
              }, 1000)
            }
            el.ontouchend = () => {
              setTimeout(function () {
                el.removeClass(hClass)
              }, 200)
            }
          }
        }
      }
    },
    methods: {
      switchBubble(){
        if (this.isShowBubble) {
          this.closeBubble()
        } else {
          this.openBubble()
        }
        this.isShowBubble = !this.isShowBubble
      },
      switchSelect(){
        this.result = this.s1Data
        if (!this.isShowSelect && this.resFlag) {
          this.resFlag = true
        } else {
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
        if (!this.isShowMbSelect && this.resFlag) {
          this.resFlag = true
        } else {
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
          this.lists = res.data
        })
      this.mouse = new MouseBubble()
      HTMLElement.prototype.addClass = function(cName){
        let aCName = cName.split(' ').filter(item => {
          return item
        })
        aCName.forEach(item => {
          if(this.className.indexOf(item) === -1){
            this.className += ` ${item} `
          }
        })
      }
      HTMLElement.prototype.removeClass = function(cName){
        let reg = new RegExp('\\b' + cName + '\\b ', 'g')
        this.className = this.className.replace(reg, '')
      }
    },
    mounted(){
      if(this.isPc){
        this.toast('手机访问效果更佳哦~')
        console.log('欢迎欢迎~')
        console.log("%c", "padding:50px;background:url('https://upload-images.jianshu.io/upload_images/11264410-e6f607b0d522c693.gif');background-size:auto 100%;");
      }else{
        this.popMsg = '快速点击左下角5次可调出vconsole哦~'
        this.showPopTime = 3
        this.isShowPopup = true
      }
      
    },
  }
</script>
<style scoped type="text/less" lang="less">
  .wrapper{
    height: 100%;
    .container{
      min-height: 100%;
      padding: 2rem .5rem;
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

  .item {
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    position: relative;
    float: left;
    width: 4rem;
    height: 4.8rem;
    margin: .25rem;
    padding-top: 1rem;
    text-align: center;
    border: 1px solid @borderColor;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    transition: all .2s;
  }
  .v-hover-enable{
    box-shadow: 1px 1px 10px 1px rgba(219, 219, 219, 0.91);
    &:hover {
      background-color: #fafafa;
      box-shadow: 5px 5px 10px 1px rgba(219, 219, 219, 0.91);
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
  .v-hover-normal{
    box-shadow: 1px 1px 10px 1px rgba(219, 219, 219, 0.91);
  }
  .v-hover-hover{
    background-color: #fafafa;
    box-shadow: 5px 5px 10px 1px rgba(219, 219, 219, 0.91);
  }
</style>
