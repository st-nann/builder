import Vue from 'vue'
import App from '../App'
import { BaseComponents } from './components/Base'
import { PanelComponents } from './components/Panels'
import { BasePages } from './pages/Base'
import { TemplatePages } from './pages/Template'

const Components: any = {
    App,
    ...BaseComponents,
    ...PanelComponents,
    ...BasePages,
    ...TemplatePages
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components

