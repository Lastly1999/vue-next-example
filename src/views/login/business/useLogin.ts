import { reactive, ref } from "vue"
import service from "@/service"
import { useRouter } from "vue-router"
import type { LoginForm } from "../types"
import { useAuthorization } from "@/stores/useAuthorization"

const useLogin = (formData: LoginForm) => {
  const router = useRouter()
  const { setToken } = useAuthorization()

  const form = reactive({
    ...formData,
  })

  const loadingStatus = ref(false)

  const loginSubmitFinish = async (values: LoginForm) => {
    loadingStatus.value = true
    try {
      const { statusCode, data } = await service.AuthorizationService.login(values)
      if (statusCode === 200) {
        setToken(data.token)
        await router.push("/admin/workbench")
      }
    } finally {
      loadingStatus.value = false
    }
  }

  return {
    form,
    loadingStatus,
    loginSubmitFinish,
  }
}

export default useLogin
