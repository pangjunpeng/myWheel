import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import msgBox from '@/components/msgBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页',
      }
    },
    {
      path: '/msgBox',
      name: 'msgBox',
      component: msgBox,
      meta: {
        title: '消息提示',
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
