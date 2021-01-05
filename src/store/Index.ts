import Vue from 'vue'
import Vuex from 'vuex'
import components from './components/Index'
import authentication from './api/authentication/Index'
import texts from './api/texts/Index'
import images from './api/images/Index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    components: components,
    authentication: authentication,
    texts: texts,
    images: images
  }
})

export default store
