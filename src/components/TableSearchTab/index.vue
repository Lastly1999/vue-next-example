<script lang="ts" setup>
import { ref, reactive, withDefaults } from "vue"
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue"
import ARow from "ant-design-vue/lib/grid/Row"
import type { FormInstance } from "ant-design-vue"
import type { TableSearchTabItem } from "./types"

export interface TableSearchTabProps {
  formOption: TableSearchTabItem[]
  span: number
}

const props = withDefaults(defineProps<TableSearchTabProps>(), {
  span: 4,
  formOption: () => [],
})

const expand = ref(false)
const formRef = ref<FormInstance>()
const formState = reactive<any>({})

const onFinish = (values: any) => {
  console.log("Received values of form: ", values)
  console.log("formState: ", formState)
}

function resetFormData() {
  formRef.value?.resetFields()
}
</script>
<template>
  <div class="talbe-search-tab" bg-white p-4>
    <!-- 表单项 搜索 通过传递进来的参数 进行渲染 -->
    <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState" @finish="onFinish">
      <a-row :gutter="24">
        <template v-for="i in props.formOption" :key="i">
          <a-col v-show="expand || i <= 6" :span="props.span">
            <a-form-item :name="`field-${i}`" :label="`field-${i}`" :rules="[{ required: true, message: 'input something' }]">
              <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"></a-input>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin: 0 8px" @click="resetFormData">重置</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined />
            </template>
            <template v-else>
              <DownOutlined />
            </template>
            {{ expand ? "展开" : "收起" }}
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
