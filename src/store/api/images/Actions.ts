import store from '../../../store/Index'
import HttpRequest from '../../../third-party/HttpRequest'
import { IState, IUploadImageRequest, IImageParam } from '../../../third-party/interfaces/HttpRequest'
import { ActionContext, ActionTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ImageState from './States'

const baseUrl = process.env.VUE_APP_ECOM_CMS_API

const actions: ActionTree<ImageState, IState> = {
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
      query = `?${limit}${limit.length > 0 ? `&${page}` : page}`
    }
    await HttpRequest.sendRequest({
      method: "GET",
      path: `${baseUrl}/galleries${query}`,
      mutation: `images/${mutationType.LISTS}`
    });
  },
  async uploadImage(
    context: ActionContext<ImageState, IState>,
    payload: { data: IUploadImageRequest }
  ) {
    await HttpRequest.sendRequest({
      method: "POST",
      path: `${baseUrl}/uploader/public`,
      mutation: `images/${mutationType.UPLOAD}`,
      payload: payload.data,
      onUploadProgress: (progress: any) => {
        store.dispatch(
          'images/updateUploadImage',
          parseInt(Math.round((progress.loaded / progress.total ) * 100) as any)
        )
      }
    })
  },
  updateUploadImage(
    { commit }: ActionContext<ImageState, IState>,
    data: number
  ) {
    commit(mutationType.UPLOAD_PERCENT, data)
  }
}

export default actions
