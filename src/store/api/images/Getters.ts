import { IState } from '../../../third-party/interfaces/HttpRequest'
import { GetterTree } from 'vuex'
import ImageState from './States'

const getters: GetterTree<ImageState, IState> = {
  lists: state => state.lists,
  upload: state => state.upload,
  uploadPercent: state => state.uploadPercent,
  uploadLists: state => state.uploadLists
}

export default getters
