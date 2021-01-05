import { IState } from '../../../third-party/interfaces/HttpRequest'
import { GetterTree } from 'vuex'
import TextState from './States'

const getters: GetterTree<TextState, IState> = {
  personalizes: state => state.personalizes
};

export default getters
