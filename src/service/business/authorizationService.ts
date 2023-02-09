import httpRequest from "@/utils/http/axios/request"
import type { DynamicRoutings, LoginForm, LoginInfoResponse } from "../model/authorizationModel"

export default class authorizationService {
  public static login(data: LoginForm) {
    return httpRequest.httpPost<LoginForm, LoginInfoResponse>("/auth/login", data)
  }
  public static getDynamicRoutes() {
    return httpRequest.httpGet<null, DynamicRoutings>("/auth/menus")
  }
}
