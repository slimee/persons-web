import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import vuexRouterSync from './plugins/vuex-router-sync'
import vue2TouchEvents from './plugins/vue2-touch-events'
import vue2PerfectScrollbar from './plugins/vue2-perfect-scrollbar'
import css from "./style.css"

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
   render: h => h(App),
})
