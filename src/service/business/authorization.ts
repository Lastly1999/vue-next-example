import httpRequest from "@/utils/http/axios/request"

export function login(data: any) {
  return httpRequest.httpPost("/auth/login", data)
}
