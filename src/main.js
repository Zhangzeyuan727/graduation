import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import './plugins/element.js'
import 'mint-ui/lib/style.css'
import './global.css' /* 引入公共样式 */
import './assets/icon/iconfont.css' /* 引入iconfont图标库 */
import http from './api/index'
import Mint from 'mint-ui';

Vue.config.productionTip = false

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
// Vue.prototype.axios = axios

window.$NODE_ENV = (process.env.NODE_ENV === 'development')

Vue.use(http)
Vue.use(Mint);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

