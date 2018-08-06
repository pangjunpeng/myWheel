// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '@/assets/style/reset.css'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

change()
let timer
window.onresize = function(){
  timer && clearTimeout(timer)
  timer = setTimeout(change, 200)
}
function change(){
  document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientWidth / 10 + 'px'
  if(document.documentElement.clientWidth > 520){
    document.getElementsByTagName('html')[0].style.fontSize = 52 + 'px'
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
