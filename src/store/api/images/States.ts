
export class ImageState {
  public login: any
  public loginInfo: any
  public lists: object[]
  public upload: object
  public uploadPercent: number

  constructor() {
    this.login = {}
    this.loginInfo = {}
    this.lists = []
    this.upload = {}
    this.uploadPercent = 0
  }
}

export default ImageState;
