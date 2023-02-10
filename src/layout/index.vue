<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue"
import { RouterView } from "vue-router"
import { ref } from "vue"
import AppMenu from "@/layout/components/AppMenu.vue"

const collapsed = ref(false)
const packUpSetup = () => {
  collapsed.value = !collapsed.value
}
</script>
<template>
  <a-layout h-full>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible width="220">
      <div flex justify-center p-4 flex-wrap items-center>
        <img width="30" src="@/assets/logo.svg" alt="" />
        <span v-if="!collapsed" pl-3 text-white text-base font-semibold>ExampleAdmin</span>
      </div>
      <AppMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header id="app-header">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="packUpSetup" />
        <menu-fold-outlined v-else class="trigger" @click="packUpSetup" />
      </a-layout-header>
      <a-layout-content overflow-hidden>
        <Transition mode="out-in" name="fade-transform" appear>
          <RouterView v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </RouterView>
        </Transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style lang="scss">
@import url("./index.scss");
</style>
