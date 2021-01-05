
import { IState } from '../../../third-party/interfaces/HttpRequest'
import { Module } from 'vuex'
import actions from './Actions'
import getters from './Getters'
import mutations from './Mutations'
import { AuthenticationState } from './States'

const authentication: Module<AuthenticationState, IState> = {
  state: new AuthenticationState(),
  actions,
  mutations,
  getters,
  namespaced: true
};

export default authentication;
