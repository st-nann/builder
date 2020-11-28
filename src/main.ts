import Vue from 'vue'
import App from './App'
import router from './router/Index'
import store from './store/Index'
import './plugins/Index'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
