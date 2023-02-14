import type { Directive } from "vue"
import { useAuthorization } from "@/stores/useAuthorization"

export const permission: Directive = {
  // mounted是指令的一个生命周期
  mounted(el, binding) {
    // value 获取用户使用自定义指令绑定的内容
    const { value } = binding
    // 获取用户所有的权限按钮
    const { permissions } = useAuthorization()
    // 判断用户使用自定义指令，是否使用正确了
    if (value && value instanceof Array && value.length > 0) {
      const permissionFunc = value
      //判断传递进来的按钮权限，用户是否拥有
      //Array.some(), 数组中有一个结果是true返回true，剩下的元素不会再检测
      const hasPermission = permissions.some((role: any) => {
        return permissionFunc.includes(role)
      })
      // 当用户没有这个按钮权限时，设置隐藏这个按钮
      if (!hasPermission) {
        el.style.display = "none"
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
  },
}