import request from '@/utils/request'
import userUrls from '../urls/user'

// 获取当前用户信息
export function fetchGetUserInfo() {
  return request({
    url: userUrls.getUserInfo,
    method: 'get'
  })
}

// 获取用户列表
export function fetchUserList(query) {
  return request({
    url: userUrls.userList,
    method: 'get',
    params: query
  })
}

// 获取用户信息
export function fetchGetUserInfoId(data) {
  return request({
    url: userUrls.getUserInfoId,
    method: 'post',
    data
  })
}

// 注册账号
export function fetchRegister(data) {
  return request({
    url: userUrls.register,
    method: 'post',
    data
  })
}

// 修改用户信息
export function fetchEditUser(data) {
  return request({
    url: userUrls.editUser,
    method: 'put',
    data
  })
}

// 修改密码
export function fetchEditPassword(data) {
  return request({
    url: userUrls.editPassword,
    method: 'put',
    data
  })
}

// 删除用户信息
export function fetchDelUser(data) {
  return request({
    url: userUrls.delUser,
    method: 'post',
    data
  })
}
