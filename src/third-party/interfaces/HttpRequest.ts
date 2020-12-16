export interface IHttpRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | "get" | "delete" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "put" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK";
  path: string;
  payload?: any;
  mutation: string;
  onUploadProgress?: any
}

export interface IHeader {
  'x-timestamp': string;
  'authorization': string;
}

export interface IState {
  [key: string]: any
}

export interface IImageParam {
  page?: string
}

export interface IUploadImageRequest {
  file: string
}
