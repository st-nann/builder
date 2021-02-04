import { IState } from '../../../third-party/interfaces/HttpRequest'
import { GetterTree } from 'vuex'
import AuthenticationState from './States'

const getters: GetterTree<AuthenticationState, IState> = {
  login: state => state.login,
  loginInfo: state => state.loginInfo
}

export default getters
