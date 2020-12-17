
export class ImageState {
  public login: any
  public loginInfo: any
  public lists: object[]
  public upload: object
  public uploadPercent: number
  // public uploadPercent: { [key: string]: number }[]

  constructor() {
    this.login = {}
    this.loginInfo = {}
    this.lists = []
    this.upload = {}
    this.uploadPercent = 100
  }
}

export default ImageState;
