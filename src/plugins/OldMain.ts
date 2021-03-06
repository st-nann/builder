import _ from 'lodash'
import Vue from 'vue'
import BuilderTemplate from '../App.vue'
import router from '../router/Index'
import store from '../store/Index'
import Components from '../plugins/Index'
import '@mdi/font/css/materialdesignicons.css'
import VueHighlightJS from 'vue-highlight.js'
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/atelier-forest-dark.css'

Vue.config.productionTip = false

Vue.use(Components)
Vue.use(VueHighlightJS)

const builder: any = document.querySelectorAll('div.builder-template-container')
const Builder = () => {
  _.forEach(builder, (node: any) => {
    const id = node.getAttributeNode('id')
    localStorage['id'] = node && !_.isNull(id) ? id.value : 'builder'

    const personalizeBaseUrl = node.getAttributeNode('data-personalize-baseurl')
    const personalizeToken = node.getAttributeNode('data-personalize-token')
    const storageBaseUrl = node.getAttributeNode('data-storage-baseurl')
    const storageToken = node.getAttributeNode('data-storage-token')
    const template = node.getAttributeNode('data-prop-template')

    const propTemplateJson = node && !_.isNull(template) ? JSON.parse(template.value) : undefined
    const root = `#${localStorage['id']}`

    if (personalizeBaseUrl) { localStorage['personalize-baseurl'] = personalizeBaseUrl.value.replaceAll('"', '') }
    if (personalizeBaseUrl) { localStorage['personalize-baseurl'] = personalizeBaseUrl.value.replaceAll('"', '') }
    if (personalizeToken) { localStorage['personalize-token'] = personalizeToken.value.replaceAll('"', '') }
    if (storageBaseUrl) { localStorage['storage-baseurl'] = storageBaseUrl.value.replaceAll('"', '') }
    if (storageToken) { localStorage['storage-token'] = storageToken.value.replaceAll('"', '') }

    setTimeout(() => {
      (window as any).vm = new Vue({
        router,
        store,
        render: (h) =>
          h(BuilderTemplate, {
            props: { propTemplateJson: propTemplateJson },
            on: {
              change(templateJson: any) {
                (window as any).vm.$el.dataset.resultTemplate = JSON.stringify(templateJson)
              }
            }
          })
      }).$mount(root)
    }, 1000)
  })
}

export default Builder()
