import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'animate.css/animate.min.css'
import store from './store/store'
import router from './router/routes'

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

Vue.config.productionTip = false


if(!process.env.VUE_APP_API_HOST) throw new Error('.ENV: VUE_APP_API_HOST is not defined.');
if(!process.env.VUE_APP_API_AUTHORIZATION) throw new Error('.ENV: VUE_APP_API_AUTHORIZATION  is not defined.');


new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
