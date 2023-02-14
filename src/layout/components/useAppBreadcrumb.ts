import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"

interface Route {
  path: string
  breadcrumbName: string
  children?: Array<{
    path: string
    breadcrumbName: string
  }>
}

function useAppBreadcrumb() {
  const route = useRoute()
  const router = useRouter()

  // 生成数组数据
  const breadcrumbData = computed<Route[]>(() => {
    const arr: Route[] = []
    console.log(route)
    return arr
  })

  return {
    breadcrumbData,
  }
}
export default useAppBreadcrumb
