import HttpRequest from "@/utils/http/axios/request"
import type { UserListItem, UserListParams } from "@/service/model/permssionModel"

export default class PermssionService {
  private static USER_PREFIX_URL = "/user"

  public static getUsers(params: UserListParams) {
    return HttpRequest.httpPost<UserListParams, UserListItem[]>(`${PermssionService.USER_PREFIX_URL}`, params)
  }
}
