import { useAuthorization } from "@/stores/useAuthorization"
import { createRouter, createWebHistory } from "vue-router"
import publicPath from "./core/publicPath"
import service from "@/service"
import NProgress from "nprogress"
import type { DynamicRouting } from "@/service/model/authorizationModel"

const modules = import.meta.glob("../views/**/*.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicPath,
})

const whiteList = ["/login"]

function lazyloadComponent(data: DynamicRouting[]) {
  data.forEach((item) => {
    if (item.children.length > 0) {
      lazyloadComponent(item.children)
    }
    router.addRoute("Admin", {
      path: `${item.router}`,
      name: item.name,
      meta: {
        title: item.name,
      },
      component: modules[`../${item.viewPath}/index.vue`],
    })
  })
}

router.beforeEach(async (to, form, next) => {
  NProgress.start()
  const { addDynamicRoutes, hasPullPermissions, setHasPullPermissions, setPermissions } = useAuthorization()
  // 为白名单中存在 即放行
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (!hasPullPermissions) {
      const { data: routes } = await service.AuthorizationService.getDynamicRoutes()
      const { data: permissions } = await service.AuthorizationService.getPermissions()
      // 添加路由表至缓存
      addDynamicRoutes(routes)
      // 添加权限至缓存
      setPermissions(permissions)
      // 动态添加路由
      lazyloadComponent(routes)
      // 设置已拉取权限
      setHasPullPermissions(true)
      next({ path: to.path })
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
