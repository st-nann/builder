import Vue from 'vue'
import App from '../App'
import { BaseComponents } from './components/Base'
import { BaseStyleComponent } from './components/Style'
import { BasePanels } from './components/Panel'
import { BasePages } from './pages/Base'
import { TemplatePages } from './pages/Template'

const Components: any = {
    App,
    ...BaseComponents,
    ...BaseStyleComponent,
    ...BasePanels,
    ...BasePages,
    ...TemplatePages
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components

