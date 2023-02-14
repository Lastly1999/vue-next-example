import type { FormInstance } from "ant-design-vue"

export interface TableSearchTabItem {
  label: string
  field: string
  type: FormRenderType
  rules?: FormInstance["rules"]
  placeholder?: string
  options?: any[]
  multiple?: boolean
}

export type FormRenderType = "input" | "select" | "date" | "datetime" | "checkboxGroup" | "radioGroup"
