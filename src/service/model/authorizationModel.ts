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
