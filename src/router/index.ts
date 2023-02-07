import { useAuthorization } from "@/stores/useAuthorization"
import { createRouter, createWebHistory } from "vue-router"
import { message } from "ant-design-vue"
import publicPath from "./core/publicPath"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicPath,
})

const whiteList = ["/login"]

router.beforeEach((to, form, next) => {
  const { tokenInfo } = useAuthorization()
  // 为白名单中存在 即放行
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (tokenInfo.accessToken) {
      next()
    } else {
      message.warning("登陆已过期，请重新登陆！")
      next("/login")
    }
  }
})

export default router
