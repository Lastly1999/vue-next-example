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

export function routerPackage(menuList: DynamicRouting[]) {
  return menuList.map((item) => {
    const currentRouter: any = {
      path: `${item.router}`,
      name: `${item.name}`,
      meta: {
        title: `${item.name}`,
      },
    }
    if (item.component?.length > 0) {
      currentRouter.component = modules["../views/"]
    }
    if (item.children.length > 0) {
      currentRouter.children = routerPackage(item.children)
    } else {
      currentRouter.component = () => import("@/layout/index.vue")
    }
    return currentRouter
  })
  // syncMenuList.forEach((item) => router.addRoute("Admin", route))
}

const loadAsyncRoutes = async () => {
  // 动态请求后台菜单
  const { data: routes } = await service.AuthorizationService.getDynamicRoutes()
  // 获取按钮权限列表
  const { data: permissions } = await service.AuthorizationService.getPermissions()
  // 生成路由栈
  await routerPackage(routes)
  return {
    routes,
    permissions,
  }
}

function lazyloadComponent(data: DynamicRouting[]) {
  data.forEach((item) => {
    if (item.children.length > 0) {
      lazyloadComponent(item.children)
    }
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
      const { permissions, routes } = await loadAsyncRoutes()
      // 添加路由表至缓存
      addDynamicRoutes(routes)
      // 添加权限至缓存
      setPermissions(permissions)
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
