import { IState } from '../../third-party/interfaces/HttpRequest'
import { ActionContext, ActionTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ComponentState from './States'

const actions: ActionTree<ComponentState, IState> = {
  loading(
    { commit }: ActionContext<ComponentState, IState>,
    data: { [key: string]: boolean }
  ) {
    commit(mutationType.LOADING, data)
  }
}

export default actions
