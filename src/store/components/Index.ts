import { IState } from '../../third-party/interfaces/HttpRequest'
import { Module } from 'vuex'
import actions from './Actions'
import getters from './Getters'
import mutations from './Mutations'
import ComponentState from './States'

const components: Module<ComponentState, IState> = {
  state: new ComponentState(),
  actions,
  mutations,
  getters,
  namespaced: true
};

export default components
