import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
import setupAntd from "@/plugins/antd"
import setupPinia from "@/plugins/pinia"
import setupNProgress from "@/plugins/nprogress"
import "uno.css"

import "./assets/main.css"

const app = createApp(App)

setupNProgress()
setupAntd(app)
setupPinia(app)

app.use(router)

app.mount("#app")
