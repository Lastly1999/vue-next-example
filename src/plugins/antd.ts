import type { App } from "vue"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"

export default (app: App) => {
  app.use(Antd)
}
