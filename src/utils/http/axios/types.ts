import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export interface InterceptorTransform {
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (axiosInstance: AxiosResponse) => any
}

export interface HttpRequestInterceptorConfig extends AxiosRequestConfig {
  interceptor: InterceptorTransform
}

export interface JsonResult<T> {
  statusCode: number
  data: T
  message: string
  timestarp: string
}
