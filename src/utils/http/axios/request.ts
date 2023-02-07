import Interceptor from "./interceptor"
import { message } from "ant-design-vue"

export default new Interceptor({
  baseURL: import.meta.env.VITE_APP_BASE_PROXY_URL,
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
    responseInterceptorsCatch: (error) => {
      if (error.response?.data) {
        message.error(error.response?.data.message)
      } else {
        message.error("连接服务器失败，请检查网络是否正常!")
      }
    },
  },
})
