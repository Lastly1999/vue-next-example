import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import type { App } from "vue"

export default (app: App) => {
  const pinia = createPinia()
  // 使用pinia持久化
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
