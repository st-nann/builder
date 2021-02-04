import { MutationTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ComponentState from './States'

const mutations: MutationTree<ComponentState> = {
  [mutationType.LOADING](
    state: ComponentState,
    data: { [key: string]: boolean }
  ): void {
    state.loading.push(data)
  }
}

export default mutations
