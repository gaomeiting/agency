// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import 'common/scss/index.scss';

Vue.use(VueLazyload, {
  loading: require('common/images/default.png')
})
//设置打包请求地址
/*axios.defaults.baseURL='http://bkdy.tunnel.qydev.com/bkdy'*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
