<script lang="ts" setup>
import { useAuthorization } from "@/stores/useAuthorization"
import AppSubMenu from "./AppSubMenu.vue"
import { useRouter, useRoute } from "vue-router"
import type { MenuProps } from "ant-design-vue"

const { appRoutes } = useAuthorization()

const router = useRouter()

const route = useRoute()

const selectMenu: MenuProps["onSelect"] = ({ key }) => router.push(key as string)
</script>

<template>
  <a-menu :selectedKeys="[route.path]" theme="dark" mode="inline" @select="selectMenu">
    <template v-for="item in appRoutes">
      <template v-if="item.children.length === 0">
        <a-menu-item :key="item.router">
          <span v-if="item.children">{{ item.name }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <AppSubMenu :menuInfo="item" :key="item.id"></AppSubMenu>
      </template>
    </template>
  </a-menu>
</template>
