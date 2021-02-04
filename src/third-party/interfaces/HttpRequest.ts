export interface IHttpRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'get' | 'delete' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'put' | 'patch' | 'PATCH' | 'link' | 'LINK' | 'unlink' | 'UNLINK'
  path: string
  payload?: any
  mutation: string
  onUploadProgress?: any
  headers?: any
}
export interface IHeader {
  'x-timestamp': string
}
export interface IState {
  [key: string]: any
}
export interface ILoginRequest {
  email: string
  password: string
}
export interface IILoginParam {
  ref: string
}

export interface ITextParam {
  page?: string
  limit?: number
}
export interface IImageParam {
  page?: string
  limit?: number
}
export interface IUploadImageRequest {
  file: any
  name: string
  url: string
  message?: string
}
