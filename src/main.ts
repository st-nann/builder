import Vue from 'vue'
import App from '@/App'
import router from '@/router/Index'
import store from '@/store/Index'
import Components from '@/plugins/Index'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Components)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
