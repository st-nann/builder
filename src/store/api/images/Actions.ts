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
    })
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
        store.dispatch(`images/updateUploadImage`, { [payload.data.name] : 0 })
        const percentUploading = parseInt(Math.round((progress.loaded / progress.total) * 100) as any)
        if (percentUploading < 100) {
          store.dispatch(`images/updateUploadImage`, { [payload.data.name] : percentUploading })
        } else {
          setTimeout(() => {
            store.dispatch(`images/updateUploadImage`, { [payload.data.name] : 50 })
          }, 1000)
          setTimeout(() => {
            store.dispatch(`images/updateUploadImage`, { [payload.data.name] : percentUploading })
          }, 5000)
        }
      }
    })
  },
  updateUploadImage(
    { commit }: ActionContext<ImageState, IState>,
    data: { [key: string]: number }
  ) {
    commit(mutationType.UPLOAD_PERCENT, data)
  },
  updateUploadLists(
    { commit }: ActionContext<ImageState, IState>,
    payload: { data: object[] }
  ) {
    commit(mutationType.UPLOAD_LISTS, payload.data)
  }
}

export default actions
