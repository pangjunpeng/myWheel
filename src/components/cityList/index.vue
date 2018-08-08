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
            买买买，服务器一定买，要不您先刷新一下
          </div>
        </transition>
        
      </div>
      <div class="city-box" v-else>
        <div class="fixed-wrapper">
          <div class="filter" :class="{'fixed': isFixed}" ref="filter">
            <input type="text" placeholder="请输入关键字" v-model="filter">
          </div>
        </div>
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
                <span class="cur-item" @click="pickCity(curCity)">{{curCity}}</span>
              </div>
            </div>
          </div>
          
        </div>
        <div class="hot-wrapper">
          <h3 class="title">热门城市</h3>
          <div class="hot-cities">
            <div v-for="item in cityList.hotCities" :key="item.id" class="hot-city">
              <span class="hot-item" @click="pickCity(item)">{{item.name}}</span>
            </div>
          </div>
        </div>
        
        <div class="cities-wrapper">
          <div v-for="(value, key) in cityList.cities">
            <div class="title">
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
  </div>
</template>
<script>
  import loading from '@/components/loading'
  import Bus from '../../Bus/bus'
  export default{
    name: 'cityList',
    components: {
      loading
    },
    data(){
      return {
        tooLong: false,
        tooTooLong: false,
        filter: '',
        hasData: false,
        cityList: [],
        curCity: '',
        geoErr: '',
        isFixed: false
      }
    },
    methods: {
      throttle(fn, time){
        let flag = false
        return function(){
          if(!flag){
            fn.call()
            flag = true
            setTimeout(() => {
              flag = false
            }, time)
          }
        }
      },
      pickCity(city){
        if(city === this.curCity){
          city = {
            id: 0,
            name: city,
            spell: '???'
          }
        }
        Bus.$emit('changeCity', city)
        this.$router.back()
      }
    },
    created(){
      // 超时提示
      setTimeout(() => {
        this.tooLong = true
      }, 5000)
      setTimeout(() => {
        this.tooTooLong = true
      }, 15000)
      // 获取数据
      this.$ajax.get('https://easy-mock.com/mock/5afc27eb3379770340408b48/example/city#!method=get')
        .then(res => {
          if(res.status === 200 && res.data.ret){
            this.hasData = true
            this.cityList = res.data.data
            
          }
        })
        .then(() => {
          // 取到数据后获取位置
          let vm = this
          const geo = new BMap.Geolocation()
          geo.getCurrentPosition(function (res) {
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
              vm.curCity = res.address.city.replace('市', '')
            } else {
              if (this.getStatus() === BMAP_STATUS_TIMEOUT) {
                vm.geoErr = ERR[this.getStatus()]
              } else {
                vm.geoErr = '获取位置失败'
              }
            }
          });
      })
    },
    mounted(){
      localStorage.curCity && (this.curCity = localStorage.curCity)
    },
    beforeRouteEnter (to, from, next){
      next(vm => {
        window.onscroll = vm.throttle(() => {
          let top = document.documentElement.scrollTop || document.body.scrollTop
          vm.isFixed = !!top
        }, 16)
      })
      
    },
    beforeRouteLeave (to, from, next){
      window.onscroll = null
      next()
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @padding: .4rem;
  .container{
    width: 100%;
    padding-top: 50px;
    
    .content{
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
          top: 50px;
          left: 0;
          width: 100%;
        }
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
        padding: .2rem 0;
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
    }
  }
  .too-long-enter, .too-too-long-enter, .too-long-leave-to, .too-too-long-leave-to {
    opacity: 0
  }
  .too-long-enter-to, .too-too-long-enter-to, .too-long-leave, .too-too-long-leave {
    opacity: 1
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg)
    }
  }
</style>
