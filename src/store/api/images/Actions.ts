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
    const query = payload.params && payload.params.page ? `?page=${payload.params.page}` : ''
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
