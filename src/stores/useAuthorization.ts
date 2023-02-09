import type { DynamicRouting, TokenInfo, UserInfo } from "@/service/model/authorizationModel"
import { defineStore } from "pinia"
import { ref } from "vue"
import type { Router } from "vue-router"

export const useAuthorization = defineStore(
  "auth",
  () => {
    const tokenInfo = ref<TokenInfo>({
      accessToken: "",
      refreshToken: "",
    })

    function setToken(value: TokenInfo) {
      tokenInfo.value = { ...value }
    }

    const userInfo = ref<UserInfo>({
      createdAt: "",
      updatedAt: "",
      id: 0,
      departmentId: 0,
      name: "",
      username: "",
      password: "",
      nickName: "",
      headImg: "",
      email: "",
      phone: "",
      remark: null,
      status: 0,
    })

    function setUserInfo(value: UserInfo) {
      userInfo.value = { ...value }
    }

    // 路由表
    const appRoutes = ref<DynamicRouting[]>([])

    /**
     * 动态新增路由
     * @param routes
     * @param router
     */
    function addDynamicRoutes(routes: DynamicRouting[], router: Router) {
      appRoutes.value = routes
      appRoutes.value.forEach((item) =>
        router.addRoute("Admin", {
          path: item.router || "",
          name: item.name,
          component: () => import(`@/${item.viewPath}`),
        })
      )
    }

    const hasPullPermissions = ref(false)

    function setHasPullPermissions(value: boolean) {
      hasPullPermissions.value = value
    }

    return {
      tokenInfo,
      userInfo,
      setUserInfo,
      setToken,
      appRoutes,
      addDynamicRoutes,
      setHasPullPermissions,
      hasPullPermissions,
    }
  },
  {
    persist: {
      paths: ["userInfo", "tokenInfo", "appRoutes"],
    },
  }
)
