import Interceptor from "./interceptor"

export default new Interceptor({
  timeout: 1000 * 60 * 1,
  interceptor: {
    /**
     * 请求拦截
     * @param opt
     * @returns {InternalAxiosRequestConfig<any>}
     */
    requestInterceptors: (opt) => {
      return opt
    },
    /**
     * 拦截错误请求
     * @param error
     */
    requestInterceptorsCatch(error) {
      throw new Error(JSON.stringify(error))
    },
    /**
     * 响应拦截
     * @param response
     * @returns {AxiosResponse<any, any>}
     */
    responseInterceptors: (response) => response,
    /**
     * 错误响应拦截
     * @param axiosInstance
     */
    responseInterceptorsCatch: (axiosInstance) => {
      throw new Error(JSON.stringify(axiosInstance))
    },
  },
})
