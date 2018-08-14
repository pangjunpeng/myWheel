<template>
  <div class="container">
    
    <div class="content">
      <div class="noData" v-if="!hasData">
        <loading class="loading"></loading>
        正在获取数据
        <transition name="too-long">
          <div v-show="tooLong" class="long-tips">
            本例使用easy-mock接口<br>可能不太稳定，请见谅
          </div>
        </transition>
        <transition name="too-too-long">
          <div v-show="tooTooLong" class="long-long-tips">
            买买买，服务器一定买，要不您先喝口水站起来活动活动
          </div>
        </transition>
      </div>
      <div class="city-box" v-else>
        <div class="fixed-wrapper">
          <div class="filter" :class="{'fixed': isFixed}" ref="filter">
            <input type="text" placeholder="请输入关键字" v-model="filter">
          </div>
        </div>
        <div v-show="!filter" class="cities-container" ref="cities">
          <div>
            <div class="pos-wrapper">
              <h3 class="title">当前城市</h3>
              <div v-if="!curCity && !geoErr" class="cur-pos-pending">
                <loading class="loading"></loading>
                正在获取位置
              </div>
              <div v-else class="cur-pos-end">
                <div class="no-city" v-if="geoErr">
                  {{geoErr}}
                </div>
                <div class="cur-city-wrapper" v-else>
                  <div class="cur-city">
                    <span class="cur-item" @click="pickCity(curCity)">{{curCity.name}}</span>
                  </div>
                </div>
              </div>
  
            </div>
            <div class="hot-wrapper">
              <h3 class="title" id="hot">热门城市</h3>
              <div class="hot-cities">
                <div v-for="item in cityList.hotCities" :key="item.id" class="hot-city">
                  <span class="hot-item" @click="pickCity(item)">{{item.name}}</span>
                </div>
              </div>
            </div>
            <div class="cities-wrapper" ref="cityList">
              <div v-for="(value, key) in cityList.cities">
                <div class="title" :id="key">
                  {{key}}
                </div>
                <div class="item-cities">
                  <div class="city-item" v-for="item in value" :key="item.id" @click="pickCity(item)">
                    {{item.name}}
                  </div>
                </div>
              </div>
  
            </div>
          </div>
          
        </div>
        <div v-show="filter" class="filter-wrapper">
          <h3 class="title">搜索结果</h3>
          <div class="item-cities">
            <div v-for="item in filterCities" :key="item.id" class="city-item" @click="pickCity(item)">
              {{item.name}}
            </div>
          </div>
        </div>
        <div v-show="!filter" class="side-nav-wrapper">
          <div class="side-nav">
            <div
              class="side-item"
              :class="{'bold': index === curIndex}"
              v-for="(item, index) in sideNavList"
              :key="index"
              @click="handleLetterClick(index)"
              @touchstart.prevent="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd(index, $event)"
              :ref="item.value"
            >
              {{item.show}}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '@/components/loading'
  import Bus from '../../Bus/bus'
  import BScroll from 'better-scroll'
  export default{
    name: 'cityList',
    components: {
      loading
    },
    data(){
      return {
        isFixed: false,
        tooLong: false,
        tooTooLong: false,
        filter: '',
        hasData: false,
        cityList: [],
        curCity: '',
        geoErr: '',
        sideNavList: [],
        letter: '',
        touchStatus: false,
        startY: 0,
        curIndex: 0
      }
    },
    computed: {
      filterCities(){
        let cityList = this.cityList.cities,
            filter = this.filter
        let resArr = []
        for(let i in cityList){
          for(let j=0; j<cityList[i].length; j++){
            if(cityList[i][j].name.match(filter) || cityList[i][j].spell.match(filter)){
              resArr.push(cityList[i][j])
            }
          }
        }
        return resArr
      },
      docHeight(){
        return document.documentElement.clientHeight || document.body.clientHeight
      },
      rem(){
        return document.getElementsByTagName('html')[0].style.fontSize.replace('px', '')
      }
    },
    methods: {
      throttle(fn, time){
        let flag = false
        return function(...args){
          if(!flag){
            fn.apply(null, args)
            flag = true
            setTimeout(() => {
              flag = false
            }, time)
          }
        }
      },
      pickCity(city){
        Bus.$emit('changeCity', city)
        this.$router.back()
      },
      getStyle(el, attr){
        if (el.style[attr]) {
          return el.style[attr]
        }
        if (window.getComputedStyle) {
          return getComputedStyle(el, false)[attr]
        } else {
          return el.currentStyle[attr]
        }
      },
      handleLetterClick(index){
        console.log('click');
        // 点击置顶
        this.letter = this.sideNavList[index]
      },
      handleTouchStart(e){
        console.log('touchstart');
        this.touchStatus = true
        this.touchY = e.touches[0].clientY
      },
      handleTouchMove(e){
        console.log('move');
        this.throttle(() => {
          if (this.touchStatus) {
            let touchY = e.touches[0].clientY - (this.rem * 2.56)
            let disY = touchY - this.startY
            let index = disY / (this.rem * 0.5) >> 0
            index < 0 && (index = 0)
            index > this.sideNavList.length - 1 && (index = this.sideNavList.length - 1)
            this.letter = this.sideNavList[index]
          }
        }, 16)(e)
      },
      handleTouchEnd(index, e){
        console.log('touchend');
        this.touchStatus = false
        if(e.changedTouches[0].clientY === this.touchY){
          this.letter = this.sideNavList[index]
        }
      }
    },
    watch: {
      letter: function(newLetter){
        this.curIndex = this.sideNavList.indexOf(newLetter)
        this.bscroll.scrollToElement(`#${newLetter.value}`, 0)
      }
    },
    created(){
      // 获取数据
      this.$ajax.get('https://easy-mock.com/mock/5afc27eb3379770340408b48/example/city#!method=get')
        .then(res => {
          if(res.status === 200 && res.data.ret){
            this.hasData = true
            this.cityList = res.data.data
          }
        }, err => {
          console.log('接口挂掉了')
          console.log(err)
        })
        .then(() => {
          // 整理侧边栏
          let cityList = this.cityList.cities
          if (this.cityList.hotCities && this.cityList.hotCities.length) {
            this.sideNavList.push({
              show : '★',
              value: 'hot'
            })
          }
          for (let i in cityList) {
            this.sideNavList.push({
              show : i,
              value: i
            })
          }
        })
        .then(() => {
          // 取到数据后获取位置
          let vm = this
          try{
            const geo = new BMap.Geolocation()
            geo.getCurrentPosition(function (res) {
              // 用户拒绝了，并且不是电脑，才显示获取失败
              if (res.accuracy === null && !navigator.platform.match('Win') && !navigator.platform.match('Mac')) {
                vm.geoErr = '获取位置失败'
                return false
              }
              const ERR = {
                0: '检索成功',
                1: '城市列表',
                2: '位置结果未知',
                3: '导航结果未知',
                4: '非法密钥',
                5: '非法请求',
                6: '您已拒绝',
                7: '服务不可用',
                8: '获取位置超时',
              }
              if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                let cityList = vm.cityList.cities
                for (let i in cityList) {
                  for (let j = 0; j < cityList[i].length; j++) {
                    if (cityList[i][j].name.match(res.address.city.replace('市', ''))) {
                      vm.curCity = cityList[i][j]
                    }
                  }
                }
              } else {
                // 应该不可能走到这来
                if (this.getStatus() === BMAP_STATUS_TIMEOUT) {
                  vm.geoErr = ERR[this.getStatus()]
                } else {
                  vm.geoErr = '获取位置失败'
                }
              }
            })
          }catch(err){
            this.geoErr = '获取位置失败'
          }
          
        })
        .catch(err => {
          console.log(err)
        })
      
      // 超时提示
      setTimeout(() => {
        this.tooLong = true
      }, 5000)
      setTimeout(() => {
        this.tooTooLong = true
      }, 15000)
    },
    mounted(){
      localStorage.curCity && (this.curCity = localStorage.curCity)
    },
    updated(){
      // Better-Scroll滑动
      if(this.sideNavList.length && !this.curCity && !this.geoErr){
        this.startY = this.$refs['hot'][0].offsetTop
        this.bscroll = new BScroll(this.$refs.cities, {
          bounce: {
            top: false
          },
          click: true
        })
      }
    },
    activated(){
      window.onscroll = this.throttle(() => {
        console.log('window scroll');
        let top = document.documentElement.scrollTop || document.body.scrollTop
        this.isFixed = !!top
      }, 16)
    },
    beforeRouteLeave (to, from, next){
      this.filter && (this.filter = '')
      window.onscroll = null
      next()
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @padding: .4rem;
  .container{
    top: @header;
    bottom: 0;
    left: 0;
    width: 100%;
    .content{
      max-width: 520px;
      margin: 0 auto;
      .fixed-wrapper {
        width: 100%;
        height: 1.2rem;
        .filter {
          height: 1.2rem;
          padding: 0 @padding;
          text-align: center;
          background-color: #fff;
          input {
            border-radius: 3px;
            width: 100%;
            height: .8rem;
            margin-top: .2rem;
            background-color: #f1f1f1;
            text-align: center;
          }
        }
        .fixed {
          position: fixed;
          top: @header;
          left: 0;
          width: 100%;
        }
      }
      .cities-container{
        position: absolute;
        top: 1.2rem;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
      }
      .pos-wrapper{
        .cur-pos-pending {
          padding: .4rem .6rem;
          background-color: #fff;
        }
        .cur-pos-end{
          display: flex;
          background-color: #fff;
          .no-city{
            padding: .4rem;
            color: #888;
          }
        }
        .loading{
          display: inline-block;
          margin-right: .2rem;
        }
      }
      .noData{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: .8rem;
        text-align: center;
        .loading{
          width: 10px;
          height: 10px;
          margin-right: @padding;
        }
        .long-tips, .long-long-tips{
          transition: all 2s;
          width: 100%;
          margin-top: 1rem;
          line-height: 1.5em;
        }
        .long-long-tips{
          transition: all .5s;
        }
      }
      .city-box{
        .title{
          padding: .2rem @padding;
        }
        
      }
      .hot-cities, .cur-city-wrapper{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: .2rem .6rem .2rem 0;
        background-color: #fff;
        .hot-city, .cur-city{
          flex-basis: 33.333%;
          text-align: center;
          padding: .1rem @padding;
          .hot-item, .cur-item{
            display: inline-block;
            width: 100%;
            padding: .15rem 0;
            border: 1px solid #888;
            border-radius: 2px;
            color: #333;
          }
        }
      }
      .item-cities{
        padding: 0 .8rem 0 .4rem;
        background-color: #fff;
        .city-item{
          padding: .38rem 0;
          border-bottom: 1px solid #f1f1f1;
          &:last-child{
            border: none;
          }
        }
      }
      .side-nav-wrapper{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        top: 2.56rem;
        bottom: 0;
        .side-nav {
          padding: 0 .2rem;
          .side-item {
            padding: .05rem;
            text-align: center;
          }
        }
      }
      
    }
  }
  .too-long-enter, .too-too-long-enter, .too-long-leave-to, .too-too-long-leave-to {
    opacity: 0
  }
  .too-long-enter-to, .too-too-long-enter-to, .too-long-leave, .too-too-long-leave {
    opacity: 1
  }
  .bold{
    font-weight: 600;
  }
</style>
