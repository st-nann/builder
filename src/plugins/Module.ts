import _ from 'lodash'
import Vue from 'vue'
import BuilderTemplate from '../App.vue'
import router from '../router/Index'
import store from '../store/Index'
import Components from './Index'
import '@mdi/font/css/materialdesignicons.css'
import VueHighlightJS from 'vue-highlight.js'
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/atelier-forest-dark.css'

Vue.config.productionTip = false

Vue.use(Components)
Vue.use(VueHighlightJS)

export default {
  store: store,
  router: router,
  component: BuilderTemplate
}
