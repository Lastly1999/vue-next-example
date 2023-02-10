<script lang="ts" setup>
import type { DynamicRouting } from "@/service/model/authorizationModel"
const props = defineProps<{ menuInfo: DynamicRouting }>()
</script>
<template>
  <a-sub-menu :key="props.menuInfo.router">
    <template #icon><MailOutlined /></template>
    <template #title>{{ props.menuInfo.name }}</template>
    <template v-for="item in props.menuInfo.children" :key="item.key">
      <template v-if="!item.children || item.children.length === 0">
        <a-menu-item :key="item.router">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ item.name }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.id" />
      </template>
    </template>
  </a-sub-menu>
</template>
