import type { App } from "vue"
import TableSearchTab from "./TableSearchTab/index.vue"

const globalComponents = [TableSearchTab]

export default (app: App) => {
  globalComponents.forEach((component) => app.component(component.name, component))
}
