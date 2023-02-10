export interface TableSearchTabItem {
  label: string
  field: string
  type: FormRenderType
}

export type FormRenderType = "input" | "select" | "date" | "datetime"
