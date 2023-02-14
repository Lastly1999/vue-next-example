import Interceptor from "./interceptor"
import { message } from "ant-design-vue"
import router from "@/router"
import { useAuthorization } from "@/stores/useAuthorization"

export default new Interceptor({
  baseURL: import.meta.env.VITE_APP_BASE_PROXY_URL,
  timeout: 1000 * 60,
  interceptor: {
    /**
     * 请求拦截
     * @param opt
     * @returns {InternalAxiosRequestConfig<any>}
     */
    requestInterceptors: (opt) => {
      const { tokenInfo } = useAuthorization()
      opt.headers.Authorization = tokenInfo.accessToken
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
     * @param error
     */
    responseInterceptorsCatch: (error) => {
      const { setToken } = useAuthorization()
      if (error.response?.data) {
        switch (error.response.data.statusCode) {
          case 401:
            message.error("登陆已过期，请重新登陆")
            setToken({ accessToken: "", refreshToken: "" })
            router.replace("/login")
        }
      } else {
        message.error("连接服务器失败，请检查网络是否正常!")
      }
    },
  },
})
