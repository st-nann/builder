import _ from 'lodash'
import axios, { AxiosInstance } from 'axios'
import store from '../store/Index'
import { IHttpRequest, IHeader } from './interfaces/HttpRequest'

class HttpRequest {
    private axios: AxiosInstance;
    private header: IHeader;
    private datetime: string;
  
    constructor() {
      this.datetime = this.getDateTime()
      this.header = {
        'x-timestamp': this.datetime,
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkMDM0NTE1LWEyMzAtNGU2Ni05YzQ4LTcxNTUzYTZhZmY3MiIsInVzZXJfaWQiOiI0MzU4ZGE3ZS1iMWFiLTQ0NTYtOGM5MC01Njc5ZmY1NzU5MjgiLCJleHAiOjE2MDgyNTk4OTl9.QB7IXfz_8gbLrQf2argySIJRnLzZigy6skmLQASqQaQ'
      };
      this.axios = axios.create({
        headers: this.header
          ? {
              'x-timestamp': this.header['x-timestamp'],
              'authorization': this.header['authorization']
            }
          : undefined
      });
      axios.interceptors.response.use(this.handleResponse, this.handleError);
    }

    private convertDateTime(value: any) {
      return ('0' + value).slice(-2)
    }

    private getDateTime() {
      const now = new Date()
      const month = this.convertDateTime(now.getMonth() + 1)
      const day = this.convertDateTime(now.getDate())
      const hour = this.convertDateTime(now.getHours())
      const minute = this.convertDateTime(now.getMinutes())
      const second = this.convertDateTime(now.getSeconds())
      const date = `${now.getFullYear()}-${month}-${day}`
      const time = `${hour}:${minute}:${second}`
      return `${date} ${time}`
    }
    
    private handleResponse(response: any) {
      return response;
    }

    private handleError(error: any) {
      alert(`${error.response.data.code}: ${error.response.data.message}`)
      throw {
        code: error.response.data.code,
        message: error.response.data.message
      }
    }

    private doRemoveKey(
      storeName: string,
      stateName: string,
      mutation: string
    ) {
      _.remove(store.state[storeName][stateName], item => {
        const keys = _.keys(item);
        return _.includes(keys, mutation);
      });
      return store.state[storeName][stateName];
    }

    public sendRequest(options: IHttpRequest) {
      store.dispatch('components/loading', { [options.mutation]: true })
      return this.axios.request({
        method: options.method,
        url: options.path,
        responseType: "json",
        data: options.payload,
        onUploadProgress: options.onUploadProgress || undefined
      }).then(async (response: any) => {
        store.commit(`${options.mutation}`, response.data)
        this.doRemoveKey('components', 'loading', options.mutation)
        store.dispatch('components/loading', { [options.mutation]: false })
      }).catch(error => {
        this.handleError(error)
      })
    }
}

export default new HttpRequest()
