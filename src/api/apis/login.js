import request from '@/utils/request'
import loginUrls from '../urls/login'

// 账号密码登录
export function fetchLogin(data) {
  return request({
    url: loginUrls.login,
    method: 'post',
    data
  })
}

// 用户登出
export function fetchLogout() {
  return request({
    url: loginUrls.logout,
    method: 'post'
  })
}
