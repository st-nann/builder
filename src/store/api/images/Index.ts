
import { IState } from '../../../third-party/interfaces/HttpRequest'
import { Module } from 'vuex'
import actions from './Actions'
import getters from './Getters'
import mutations from './Mutations'
import { ImageState } from './States'

const images: Module<ImageState, IState> = {
  state: new ImageState(),
  actions,
  mutations,
  getters,
  namespaced: true
};

export default images;
