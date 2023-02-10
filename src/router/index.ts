import { useAuthorization } from "@/stores/useAuthorization"
import { createRouter, createWebHistory } from "vue-router"
import publicPath from "./core/publicPath"
import service from "@/service"
import NProgress from "nprogress"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicPath,
})

const whiteList = ["/login"]

router.beforeEach((to, form, next) => {
  NProgress.start()
  const { addDynamicRoutes, hasPullPermissions, setHasPullPermissions } = useAuthorization()
  // 为白名单中存在 即放行
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (!hasPullPermissions) {
      service.AuthorizationService.getDynamicRoutes().then((result) => {
        addDynamicRoutes(result.data, router)
        setHasPullPermissions(true)
        next()
      })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.onError((err) => {
  console.log("err", err)
  NProgress.done()
})

export default router
