
export class ImageState {
  public lists: object[]
  public upload: object
  public uploadPercent: number
  // public uploadPercent: { [key: string]: number }[]

  constructor() {
    this.lists = []
    this.upload = {}
    this.uploadPercent = 100
  }
}

export default ImageState;
