import { reactive } from "vue"

const useLogin = <T extends Object>(formData: T) => {
  const form = reactive({
    ...formData,
  })

  const loginSubmitFinish = (values: T) => {
    console.log(values)
  }

  return {
    form,
    loginSubmitFinish,
  }
}

export default useLogin
