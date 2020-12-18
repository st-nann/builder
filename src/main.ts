import Vue from 'vue'
import BuilderTemplate from './App.vue'
import router from './router/Index'
import store from './store/Index'
import Components from './plugins/Index'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Components)

const Builder = new Vue({
  router,
  store,
  render: h => h(BuilderTemplate)
}).$mount('#app')

export default Builder
