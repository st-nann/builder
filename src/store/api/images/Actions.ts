import store from '../../../store/Index'
import HttpRequest from '../../../third-party/HttpRequest'
import {
  IState,
  ILoginRequest,
  IILoginParam,
  IUploadImageRequest,
  IImageParam
} from '../../../third-party/interfaces/HttpRequest'
import { ActionContext, ActionTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ImageState from './States'

const baseUrl = process.env.VUE_APP_BASE_URL
const cmsApi = process.env.VUE_APP_ECOM_CMS_API

const actions: ActionTree<ImageState, IState> = {
  async login(
    context: ActionContext<ImageState, IState>,
    payload: { data: ILoginRequest }
  ) {
    await HttpRequest.sendRequest({
      method: "POST",
      path: baseUrl ? baseUrl : `${cmsApi}/login`,
      mutation: `images/${mutationType.LOGIN}`,
      payload: payload.data
    })
  },
  async getLoginData(
    context: ActionContext<ImageState, IState>,
    payload: { headers: IILoginParam }
  ) {
    await HttpRequest.sendRequest({
      method: "GET",
      path: baseUrl ? baseUrl : `${cmsApi}/login`,
      mutation: `images/${mutationType.LOGIN_INFORMATION}`,
      headers: { 'ref': payload.headers.ref }
    })
  },
  async getImages(
    context: ActionContext<ImageState, IState>,
    payload: { params?: IImageParam }
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
      method: "GET",
      path: baseUrl ? baseUrl : `${cmsApi}/galleries${query}`,
      mutation: `images/${mutationType.LISTS}`
    });
  },
  async uploadImage(
    context: ActionContext<ImageState, IState>,
    payload: { data: IUploadImageRequest }
  ) {
    await HttpRequest.sendRequest({
      method: "POST",
      path: baseUrl ? baseUrl : `${cmsApi}/uploader/public`,
      mutation: `images/${mutationType.UPLOAD}`,
      payload: payload.data.file,
      headers: { 'Content-Type': 'multipart/form-data' },
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
