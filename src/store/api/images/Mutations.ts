import { MutationTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ImageState from './States'

const mutations: MutationTree<ImageState> = {
  [mutationType.LISTS](
    state: ImageState,
    data: object[]
  ): void {
    state.lists = data
  },
  [mutationType.UPLOAD](
    state: ImageState,
    data: object
  ): void {
    state.upload = data
  },
  [mutationType.UPLOAD_PERCENT](
    state: ImageState,
    data: number
  ): void {
    state.uploadPercent = data
  }
};

export default mutations
