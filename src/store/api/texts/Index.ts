
import { IState } from '../../../third-party/interfaces/HttpRequest'
import { Module } from 'vuex'
import actions from './Actions'
import getters from './Getters'
import mutations from './Mutations'
import { TextState } from './States'

const texts: Module<TextState, IState> = {
  state: new TextState(),
  actions,
  mutations,
  getters,
  namespaced: true
};

export default texts;
