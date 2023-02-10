<script lang="ts" setup>
import { ref } from "vue"
import { useAuthorization } from "@/stores/useAuthorization"
import type { MenuProps } from "ant-design-vue"
import AppSubMenu from "./AppSubMenu.vue"

const { appRoutes } = useAuthorization()

const selectedKeys = ref<string[]>(["1"])

const selectMenu: MenuProps["onSelect"] = ({ item }) => {
  console.log(item)
}
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="selectMenu">
    <template v-for="item in appRoutes">
      <template v-if="item.children.length === 0">
        <a-menu-item :key="item.id">
          <span v-if="item.children">{{ item.name }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <AppSubMenu :menuInfo="item" :key="item.id"></AppSubMenu>
      </template>
    </template>
  </a-menu>
</template>
