import request from "@/utils/request";
import userUrls from "../urls/user";

//获取当前用户信息
export function fetchGetUserInfo() {
  return request({
    url: userUrls.getUserInfo,
    method: "get",
    params: {}
  });
}

export function fetchUserList(data) {
  return request({
    url: userUrls.userList,
    method: "post",
    data
  })
}