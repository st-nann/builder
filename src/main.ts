
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
    const baseurl = node.getAttributeNode('data-baseurl')
    const token = node.getAttributeNode('data-token')
    const template = node.getAttributeNode('data-prop-template')
    const root = `#${node && !_.isNull(id) ? id.value : 'builder'}`
    const propTemplateJson = node && !_.isNull(template) ? JSON.parse(template.value) : undefined

    if (baseurl) { localStorage['baseurl'] = baseurl.value.replaceAll('"', '') }
    if (token) { localStorage['authorization'] = token.value.replaceAll('"', '') }

    const vue = new Vue({
      router,
      store,
      render: h => h(BuilderTemplate, {
        props: { propTemplateJson: propTemplateJson },
        on: {
          change(template: any) {
            (vue.$el as any).dataset.resultTemplate = JSON.stringify(template)
          }
        }
      })
    }).$mount(root)
  })
}

export default Builder()
