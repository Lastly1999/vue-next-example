<script lang="ts" setup>
import useAppBreadcrumb from "@/layout/components/useAppBreadcrumb"

const { breadcrumbData } = useAppBreadcrumb()
</script>

<template>
  <a-breadcrumb inline-block class="breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <a-breadcrumb-item v-for="(item, index) of breadcrumbData" :key="index" style="padding: 5px">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
      </a-breadcrumb-item>
    </transition-group>
  </a-breadcrumb>
</template>
