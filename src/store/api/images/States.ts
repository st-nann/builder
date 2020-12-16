
export class ImageState {
  public lists: object[]
  public upload: object
  public uploadPercent: number

  constructor() {
    this.lists = []
    this.upload = {}
    this.uploadPercent = 0
  }
}

export default ImageState;
