<script lang="ts" setup>
import useBackHome from "./business/useBackHome"

const { backHome } = useBackHome()
</script>
<template>
  <a-result status="404" title="404" sub-title="啊，你的页面好像走丢了...">
    <template #extra>
      <a-button type="primary" @click="backHome">返回首页</a-button>
    </template>
  </a-result>
</template>
