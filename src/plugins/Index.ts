import Vue from 'vue'
import App from '@/App'
import { BaseComponents } from '@/plugins/components/Base'
import { BasePages } from '@/plugins/pages/Base'

const Components: any = {
    App,
    ...BaseComponents,
    ...BasePages
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

