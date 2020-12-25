
import _ from 'lodash'
import Vue from 'vue'
import BuilderTemplate from './App.vue'
import router from './router/Index'
import store from './store/Index'
import Components from './plugins/Index'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Components)

const builder: any = document.querySelectorAll('#builder')
const Builder = () => {
  _.forEach(builder, (node: any) => {
    const id = node.getAttributeNode('data-id')
    const template = node.getAttributeNode('data-prop-template')
    const root = `#${node && !_.isNull(id) ? id.value : 'builder'}`
    const propTemplateJson = node && !_.isNull(template) ? JSON.parse(template.value) : undefined

    const vue = new Vue({
      router,
      store,
      render: h => h(BuilderTemplate, {
        props: { propTemplateJson: propTemplateJson },
        on: {
          change(template: any) {
            vue.$root.$on('change', template)
            console.log('template: ', template)
          }
        }
      })
    }).$mount(root)
  })
}

export default Builder()
