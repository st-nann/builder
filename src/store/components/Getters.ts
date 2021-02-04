import { IState } from '../../third-party/interfaces/HttpRequest'
import { GetterTree } from 'vuex'
import ComponentState from './States'

const getters: GetterTree<ComponentState, IState> = {
  loading: state => { return state.loading }
}

export default getters
