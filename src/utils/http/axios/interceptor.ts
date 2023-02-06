import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import type { HttpRequestInterceptorConfig, InterceptorTransform, JsonResult } from "./types"

export default class Interceptor {
  private axiosInstance: AxiosInstance

  private axiosInterceptors: InterceptorTransform

  constructor(opt: HttpRequestInterceptorConfig) {
    this.axiosInstance = axios.create(opt)
    this.axiosInterceptors = opt.interceptor
    this.axiosInstance.interceptors.request.use(this.axiosInterceptors.requestInterceptors, this.axiosInterceptors.requestInterceptorsCatch)
    this.axiosInstance.interceptors.response.use(this.axiosInterceptors.responseInterceptors, this.axiosInterceptors.responseInterceptorsCatch)
  }

  /**
   * request 适配器
   * @param config
   */
  public request<T>(config: AxiosRequestConfig): Promise<JsonResult<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }

  public httpGet<T = any, K = any>(url: string, params?: T) {
    return this.request<K>({ method: "GET", url, params })
  }

  public httpPost<T = any, K = any>(url: string, data?: T) {
    return this.request<K>({ method: "POST", url, data })
  }

  public httpPatch<T = any, K = any>(url: string, data?: T) {
    return this.request<K>({ method: "PATCH", url, data })
  }

  public httpDelete<T = any, K = any>(url: string, data?: T) {
    return this.request<K>({ method: "DELETE", url, data })
  }

  public httpPut<T = any, K = any>(url: string, data?: T) {
    return this.request<K>({ method: "PUT", url, data })
  }
}
