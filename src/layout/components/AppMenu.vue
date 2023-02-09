<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue"
import { useAuthorization } from "@/stores/useAuthorization"
import { ref } from "vue"

const { appRoutes } = useAuthorization()

const selectedKeys = ref<string[]>(["1"])
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item v-for="item in appRoutes" :key="item.id">
      <user-outlined />
      <span>{{ item.name }}</span>
    </a-menu-item>
  </a-menu>
</template>
