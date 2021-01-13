import store from '../../../store/Index'
import HttpRequest from '../../../third-party/HttpRequest'
import {
  IState,
  IUploadImageRequest,
  IImageParam
} from '../../../third-party/interfaces/HttpRequest'
import { ActionContext, ActionTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ImageState from './States'
import { ENV } from '../../../constants/Env'

const baseUrl = localStorage['storage-baseurl'] || ENV.BASE_URL_STORAGE

const actions: ActionTree<ImageState, IState> = {
  async getImages(
    context: ActionContext<ImageState, IState>,
    payload: { params?: IImageParam }
  ) {
    const token = localStorage['storage-token'] || store.getters['authentication/loginInfo'].token
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
      path: `${baseUrl}/galleries${query}`,
      headers: { 'authorization': token },
      mutation: `images/${mutationType.LISTS}`
    });
  },
  async uploadImage(
    context: ActionContext<ImageState, IState>,
    payload: { data: IUploadImageRequest }
  ) {
    const token = localStorage['storage-token'] || store.getters['authentication/loginInfo'].token
    await HttpRequest.sendRequest({
      method: 'POST',
      path: `${baseUrl}/uploader/public`,
      mutation: `images/${mutationType.UPLOAD}`,
      payload: payload.data.file,
      headers: {
        'authorization': token,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progress: any) => {
        store.dispatch(
          `images/updateUploadImage`,
          parseInt(Math.round((progress.loaded / progress.total) * 100) as any)
          // { [payload.data.name]: parseInt(Math.round((progress.loaded / progress.total) * 100) as any) }
        )
      }
    })
  },
  updateUploadImage(
    { commit }: ActionContext<ImageState, IState>,
    data: number
    // data: object
  ) {
    commit(mutationType.UPLOAD_PERCENT, data)
  }
}

export default actions
