import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import msgBox from '@/components/msgBox'
import cityList from '@/components/cityList/cityList'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path     : '/',
      name     : 'Index',
      component: Index,
      meta     : {
        title: '首页',
      }
    },
    {
      path     : '/msgBox',
      name     : 'msgBox',
      component: msgBox,
      meta     : {
        title: '消息提示',
      }
    },
    {
      path     : '/city',
      name     : 'cityList',
      component: cityList,
      meta     : {
        title: '城市选择',
      }
    },
    {
      path    : '*',
      redirect: '/'
    }
  ],
})

export default router
