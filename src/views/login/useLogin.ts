import { reactive, ref } from "vue"
import service from "@/service"
import { useRouter } from "vue-router"
import type { LoginForm } from "./types"
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
    const { statusCode, data } = await service.authorizationService.login(values).finally(() => (loadingStatus.value = false))
    if (statusCode === 200) {
      setToken(data.token)
      router.push("/admin/workbench")
    }
  }

  return {
    form,
    loadingStatus,
    loginSubmitFinish,
  }
}

export default useLogin
