<template>
  <div class="container">
    <div class="fixed-wrapper">
      <div class="filter" :class="{'fixed': isFixed}" ref="filter">
        <input type="text" placeholder="请输入关键字" v-model="filter">
      </div>
    </div>
    <div class="content">
      <div class="noData" v-if="hasData">
        <loading class="loading"></loading>
        正在获取数据
      </div>
      <div class="hot-city" v-else>
        <h3>热门城市</h3>
        <div class="hot-cities">
          <div v-for="item in cityList.hotCities" :key="item.id" class="hot-item">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '@/components/loading'
  export default{
    name: 'cityList',
    components: {
      loading
    },
    data(){
      return {
        filter: '',
        hasData: false,
        cityList: [],
        isFixed: false
      }
    },
    created(){
      this.$ajax.get('https://easy-mock.com/mock/5afc27eb3379770340408b48/example/city#!method=get')
        .then(res => {
          res.status === 200 && res.data.ret && (this.hasData = true, this.cityList = res.data.data)
          console.log(this.cityList)
        })
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
        
      }
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
  .container{
    padding-top: 50px;
    .fixed-wrapper{
      width: 100%;
      height: 1.2rem;
      .filter {
        height: 1.2rem;
        padding: 0 .4rem;
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
      .fixed{
        position: fixed;
        top: 50px;
        left: 0;
        width: 100%;
      }
    }
    .content{
      .noData{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .4rem;
        text-align: center;
        .loading{
          width: .2rem;
          height: .2rem;
          margin-right: .4rem;
        }
      }
      .hot-city{
        h3{
          padding: .2rem .4rem;
        }
        .hot-cities{
          background-color: #fff;
          .hot-item{
            color: #333;
          }
        }
      }
      
    }
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
