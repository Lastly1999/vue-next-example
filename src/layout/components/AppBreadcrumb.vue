<script lang="ts" setup>
import { ref, watch } from "vue"
import { type RouteLocationMatched, useRoute, useRouter } from "vue-router"

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref<RouteLocationMatched[]>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title)
}
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
  }
)

// 处理点击事件
const router = useRouter()
const onLinkClick = (item: RouteLocationMatched) => {
  router.push(item.path)
}

const basePath = ref<string>("/")
</script>

<template>
  <a-breadcrumb class="breadcrumb" separator="/" :routes="breadcrumbData">
    <transition-group name="breadcrumb">
      <template #itemRender="{ route, paths }">
        <span v-if="breadcrumbData.indexOf(route) === breadcrumbData.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
      <!--      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">-->
      <!--        &lt;!&ndash; 不可点击项 &ndash;&gt;-->
      <!--        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ item.meta.title }}</span>-->
      <!--        &lt;!&ndash; 可点击项 &ndash;&gt;-->
      <!--        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ item.meta.title }}</a>-->
      <!--      </el-breadcrumb-item>-->
    </transition-group>
  </a-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }
}
</style>
