export interface LoginForm {
  userName: string
  passWord: string
}

export interface TokenInfo {
  refreshToken: string
  accessToken: string
}

export interface UserInfo {
  createdAt: string
  updatedAt: string
  id: number
  departmentId: number
  name: string
  username: string
  password: string
  nickName: string
  headImg: string
  email: string
  phone: string
  remark: string | null
  status: number
}

export interface LoginInfoResponse {
  token: TokenInfo
  userInfo: UserInfo
}

export interface DynamicRoutingItem {
  createdAt: string
  icon: string
  id: number
  isShow: number
  keepalive: number
  name: string
  orderNum: number
  parentId: number
  perms: string
  router: string | null
  type: number
  updatedAt: string | null
  viewPath: string | null
}

export interface DynamicRouting extends DynamicRoutingItem {
  children: DynamicRoutingItem
}

export type DynamicRoutings = DynamicRouting[]
