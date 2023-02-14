<script lang="ts" setup>
import { computed } from "vue"
import CustomTable from "@/components/CustomTable/index.vue"
import TableSearchTab from "@/components/TableSearchTab/index.vue"
import { usePagination } from "vue-request"
import { searchTabJsonData, columns } from "./user.data"
import service from "@/service"

const { data, loading, refresh } = usePagination(service.PermssionService.getUsers, {
  defaultParams: [{}],
})
const list = computed(() => data.value?.data || [])

const searchFilter = (values: any) => {
  console.log("searchFilter", values)
  refresh()
}

console.log(list)
</script>
<template>
  <a-Layout h-full p-3 flex>
    <a-header>
      <TableSearchTab :form-option="searchTabJsonData" :span="4" @finish="searchFilter"></TableSearchTab>
    </a-header>
    <a-content flex flex-1 bg-white>
      <CustomTable bordered flex-1 :loading="loading" :data-source="list" :columns="columns" :form-option="searchTabJsonData" />
    </a-content>
  </a-Layout>
</template>
