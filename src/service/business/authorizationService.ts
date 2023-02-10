import HttpRequest from "@/utils/http/axios/request"
import type { DynamicRoutings, LoginForm, LoginInfoResponse } from "../model/authorizationModel"

export default class authorizationService {
  public static login(data: LoginForm) {
    return HttpRequest.httpPost<LoginForm, LoginInfoResponse>("/auth/login", data)
  }
  public static getDynamicRoutes() {
    return HttpRequest.httpGet<null, DynamicRoutings>("/auth/menus")
  }
  public static getPermissions() {
    return HttpRequest.httpGet<null, string[]>("/auth/permissions")
  }
}
