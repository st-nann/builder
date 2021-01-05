import HttpRequest from '../../../third-party/HttpRequest'
import {
  IState,
  ILoginRequest,
  IILoginParam
} from '../../../third-party/interfaces/HttpRequest'
import { ActionContext, ActionTree } from 'vuex'
import { mutationType } from './MutationTypes'
import AuthenticationState from './States'
import { ENV } from '../../../constants/Env'

const baseUrl = localStorage['storage-baseurl'] || ENV.BASE_URL_STORAGE

const actions: ActionTree<AuthenticationState, IState> = {
  async login(
    context: ActionContext<AuthenticationState, IState>,
    payload: { data: ILoginRequest }
  ) {
    await HttpRequest.sendRequest({
      method: "POST",
      path: `${baseUrl}/login`,
      mutation: `authentication/${mutationType.LOGIN}`,
      payload: payload.data
    })
  },
  async getLoginData(
    context: ActionContext<AuthenticationState, IState>,
    payload: { headers: IILoginParam }
  ) {
    await HttpRequest.sendRequest({
      method: "GET",
      path: `${baseUrl}/login`,
      mutation: `authentication/${mutationType.LOGIN_INFORMATION}`,
      headers: { 'ref': payload.headers.ref }
    })
  }
}

export default actions
