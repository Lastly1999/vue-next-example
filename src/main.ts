import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
import setupAntd from "@/plugins/antd"
import setupPinia from "@/plugins/pinia"
import setupNProgress from "@/plugins/nprogress"
import setupGlobalComponent from "@/components"
import { permission } from "@/directives/permission"
import "uno.css"
import "animate.css"

import "./assets/main.css"

function bootstarp() {
  const app = createApp(App)

  app.directive("permission", permission)

  setupNProgress()
  setupAntd(app)
  setupPinia(app)
  setupGlobalComponent(app)

  app.use(router)

  app.mount("#app")
}

bootstarp()
