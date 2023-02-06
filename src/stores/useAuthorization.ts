import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthorization = defineStore("auth", () => {
  const token = ref()

  function setToken(value: string) {
    token.value = value
  }

  return {
    token,
    setToken,
  }
})
