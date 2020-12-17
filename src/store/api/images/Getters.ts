import { IState } from '../../../third-party/interfaces/HttpRequest'
import { GetterTree } from 'vuex'
import ImageState from './States'

const getters: GetterTree<ImageState, IState> = {
  login: state => state.login,
  loginInfo: state => state.loginInfo,
  lists: state => state.lists,
  upload: state => state.upload,
  uploadPercent: state => state.uploadPercent
};

export default getters
