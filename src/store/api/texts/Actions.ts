import HttpRequest from '../../../third-party/HttpRequest'
import {
  IState,
  ITextParam
} from '../../../third-party/interfaces/HttpRequest'
import { ActionContext, ActionTree } from 'vuex'
import { mutationType } from './MutationTypes'
import TextState from './States'
import { ENV } from '../../../constants/Env'

const baseUrl = localStorage['personalize-baseurl'] || ENV.BASE_URL_PERSONALIZE

const actions: ActionTree<TextState, IState> = {
  async getPersonalizes(
    context: ActionContext<TextState, IState>,
    payload: { params?: ITextParam }
  ) {
    let [query, limit, page] = ['', '', '']
    if (payload.params) {
      limit = payload.params.limit ? `limit=${payload.params.limit}` : ''
      page = payload.params.page ? `page=${payload.params.page}` : ''
    }
    if (limit.length > 0 || page.length > 0) {
      query = `?${limit}${limit.length > 0 && page ? `&${page}` : page}`
    }
    await HttpRequest.sendRequest({
      method: 'GET',
      path: `${baseUrl}/customers/attributes${query}`,
      mutation: `texts/${mutationType.PERSONALIZE}`,
      headers: { 'authorization': localStorage['personalize-token'] }
    })
  }
}

export default actions
