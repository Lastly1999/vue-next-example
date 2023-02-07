import type { TokenInfo, UserInfo } from "@/service/model/authorizationModel"
import { defineStore } from "pinia"
import { ref } from "vue"

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

    return {
      tokenInfo,
      userInfo,
      setUserInfo,
      setToken,
    }
  },
  {
    persist: true,
  }
)
