<script lang="ts" setup>
import { withDefaults, computed, ref, reactive } from "vue"
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue"
import type { FormInstance } from "ant-design-vue"
import type { TableSearchTabItem } from "./types"

export interface TableSearchTabProps {
  formOption: TableSearchTabItem[]
  span: number
  gutter: number
}

const props = withDefaults(defineProps<TableSearchTabProps>(), {
  span: 4,
  formOption: () => [],
  gutter: 24,
})

const emits = defineEmits<{
  (e: "reset", data: any): void
  (e: "finish", values: any): void
}>()

const lineTotal = computed(() => 24 / props.span)

const expand = ref(false)
const formRef = ref<FormInstance>()
const formState = reactive<any>({})

const expandVisible = computed(() => props.formOption.length >= lineTotal.value)

const onFinish = (values: any) => {
  emits("finish", formState)
}

function resetFormData() {
  formRef.value?.resetFields()
  emits("reset", formState)
}
</script>
<template>
  <div class="talbe-search-tab" bg-white p-4>
    <!-- 表单项 搜索 通过传递进来的参数 进行渲染 -->
    <a-form ref="formRef" name="advanced_search" class="ant-advanced-search-form" :model="formState" @finish="onFinish">
      <a-row :gutter="24">
        <template v-for="(item, index) in props.formOption" :key="item.field">
          <a-col flex v-show="expand || index + 1 <= lineTotal" :span="props.span">
            <a-form-item px-3 :name="item.field" :label="item.label" :rules="item.rules">
              <!-- input -->
              <a-input v-if="item.type === 'input'" v-model:value="formState[item.field]" :placeholder="item.placeholder"></a-input>
              <!-- checkbox-group -->
              <a-checkbox-group v-if="item.type === 'checkboxGroup'" v-model:value="formState[item.field]">
                <a-checkbox v-for="optItem in item.options" :value="optItem.value" :name="optItem.name" :key="optItem.value">{{ optItem.name }}</a-checkbox>
              </a-checkbox-group>
              <!-- radio-group -->
              <a-radio-group v-if="item.type === 'radioGroup'" v-model:value="formState[item.field]">
                <a-radio v-for="optItem in item.options" :value="optItem.value" :key="optItem.value">{{ optItem.name }}</a-radio>
              </a-radio-group>
            </a-form-item>
            <!-- select -->
            <a-select v-if="item.type === 'select'" v-model:value="formState[item.field]" :mode="item?.multiple" :placeholder="item.placeholder" :options="item.options"></a-select>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin: 0 8px" @click="resetFormData">重置</a-button>
          <a v-if="expandVisible" style="font-size: 12px" @click="expand = !expand">
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
