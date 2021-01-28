import Vue from 'vue'
import BuilderTemplate from './App.vue'
import router from './router/Index'
import store from './store/Index'
import Components from './plugins/Index'
import '@mdi/font/css/materialdesignicons.css'
import VueHighlightJS from 'vue-highlight.js'
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/atelier-forest-dark.css'

Vue.config.productionTip = false

Vue.use(Components)
Vue.use(VueHighlightJS)

localStorage.id = 'builder'

setTimeout(() => {
  (window as any).vm = new Vue({
    router,
    store,
    render: (h) => h(BuilderTemplate)
  }).$mount('#builder')
}, 1000)
