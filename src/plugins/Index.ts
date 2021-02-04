import Vue from 'vue'
import BuilderTemplate from '../App.vue'
import { BaseComponents } from './components/Base'
import { BaseStyleComponent } from './components/Style'
import { BasePanels } from './components/Panel'
import { BasePages } from './pages/Base'
import { TemplatePages } from './pages/Template'

const Components: any = {
  BuilderTemplate,
  ...BaseComponents,
  ...BaseStyleComponent,
  ...BasePanels,
  ...BasePages,
  ...TemplatePages
}

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export default Components
