<script lang="ts" setup>
import { withDefaults } from "vue"
import type { TableProps } from "ant-design-vue"
import type { TableSearchTabItem } from "../TableSearchTab/types"

export interface CustomTableProps {
  /**
   * 列表搜索组件渲染字段
   */
  formOption?: TableSearchTabItem[]
  /**
   * 斑马格
   */
  tableStriped?: false
  /**
   * 表格行class名称
   * @param _record
   * @param index
   */
  setColClassName?: (_record: any, index: number) => string | null
  size: TableProps["size"]
  columns: TableProps["columns"]
  dataSource: TableProps["dataSource"]
  bordered: TableProps["bordered"]
  loading: TableProps["loading"]
}

const props = withDefaults(defineProps<CustomTableProps>(), {
  size: "middle",
  dataSource: () => [],
  bordered: true,
})

console.log(props)

// 表格cell样式
const setClassName = () => (_record: any, index: number) => index % 2 === 1 ? "table-striped" : null
</script>
<template>
  <div px-3 bg-white>
    <a-table v-bind="props" :row-class-name="props.tableStriped ? setClassName : props.rowClassName" />
  </div>
</template>
<style>
.ant-table-striped :deep(.table-striped) td {
  background-color: #272525;
}
</style>
