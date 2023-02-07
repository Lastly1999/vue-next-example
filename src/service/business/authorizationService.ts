import httpRequest from "@/utils/http/axios/request"
import type { LoginForm, LoginInfoResponse } from "../model/authorizationModel"

export default class authorizationService {
  public login(data: LoginForm) {
    return httpRequest.httpPost<LoginForm, LoginInfoResponse>("/auth/login", data)
  }
}
