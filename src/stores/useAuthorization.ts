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
    function addDynamicRoutes(routes: DynamicRouting[]) {
      appRoutes.value = routes
    }

    const hasPullPermissions = ref(false)

    function setHasPullPermissions(value: boolean) {
      hasPullPermissions.value = value
    }

    // 按钮权限
    const permissions = ref<string[]>([])

    function setPermissions(values: string[]) {
      permissions.value = [...values]
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
      permissions,
      setPermissions,
    }
  },
  {
    persist: {
      paths: ["userInfo", "tokenInfo", "appRoutes", "permissions"],
    },
  }
)
