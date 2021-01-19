
export class ImageState {
  public lists: object[]
  public upload: object
  public uploadPercent: { [key: string]: number }
  public uploadLists: object[]

  constructor() {
    this.lists = []
    this.upload = {}
    this.uploadPercent = {}
    this.uploadLists = []
  }
}

export default ImageState;
