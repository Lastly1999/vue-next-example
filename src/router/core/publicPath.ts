import Layout from "@/layout/index.vue"
import type { RouteRecordRaw } from "vue-router"

const publicPath: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import(`@/views/login/index.vue`),
  },
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/admin",
    name: "Admin",
    component: Layout,
    children: [
      {
        path: "/:pathMatch(.*)*", // 捕获所有路由或 404 Not found 路由
        component: () => import("@/views/error/404.vue"),
      },
    ],
  },
]

export default publicPath
