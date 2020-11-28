import Vue from 'vue'
import App from '../App'
import { BaseComponents } from './components/Base'
import { BasePages } from './pages/Base'

const Components: any = {
    App,
    ...BaseComponents,
    ...BasePages
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components

