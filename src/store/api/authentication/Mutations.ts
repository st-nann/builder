import { MutationTree } from 'vuex'
import { mutationType } from './MutationTypes'
import AuthenticationState from './States'

const mutations: MutationTree<AuthenticationState> = {
  [mutationType.LOGIN](
    state: AuthenticationState,
    data: any
  ): void {
    state.login = data
  },
  [mutationType.LOGIN_INFORMATION](
    state: AuthenticationState,
    data: any
  ): void {
    state.loginInfo = data
  }
}

export default mutations
