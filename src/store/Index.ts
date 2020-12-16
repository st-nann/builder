import Vue from 'vue'
import Vuex from 'vuex'
import components from './components/Index'
import images from './api/images/Index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    components: components,
    images: images
  }
})

export default store
