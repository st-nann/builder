import { MutationTree } from 'vuex'
import { mutationType } from './MutationTypes'
import ImageState from './States'

const mutations: MutationTree<ImageState> = {
  [mutationType.LISTS](
    state: ImageState,
    data: object[]
  ): void {
    state.lists = data
  },
  [mutationType.UPLOAD](
    state: ImageState,
    data: object
  ): void {
    state.upload = data
  },
  [mutationType.UPLOAD_PERCENT](
    state: ImageState,
    data: number
    // data: { [key: string]: number }
  ): void {
    state.uploadPercent = data
    /* array */
    // const key = _.head(Object.keys(data))
    // if (state.uploadPercent.length > 0) {
    //   state.uploadPercent.map((item: any) => {
    //     const transformData = { ...data }
    //     if (key && item[key]) {
    //       item[key] = data[key]
    //       transformData[key] = item[key]
    //     }
    //     return { ...transformData }
    //   })
    // } else {
    //   state.uploadPercent.push(data)
    // }
  }
}

export default mutations
