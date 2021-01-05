import { MutationTree } from 'vuex'
import { mutationType } from './MutationTypes'
import TextState from './States'

const mutations: MutationTree<TextState> = {
  [mutationType.PERSONALIZE](
    state: TextState,
    data: any
  ): void {
    state.personalizes = data
  }
};

export default mutations
