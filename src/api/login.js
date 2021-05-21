import request from '@/utils/request'
import requestNoMsg from '@/utils/requestNoMsg'

export function loginByUsername(actAccount, actPassword, yzm) {
  const data = {
    actAccount,
    actPassword,
    yzm
  }
  return requestNoMsg({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function logout(params) {
  return requestNoMsg({
    url: '/account/logout',
    method: 'get',
    params
  })
}

export function modifyPwd(data) {
  return request({
    url: '/account/modifyMyPassword',
    method: 'post',
    data
  })
}

export function getKey(params) {
  return request({
    url: '/account/getToken',
    method: 'get',
    params
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { 'access-token': token }
  })
}

// 获取验证码
export function getYzm() {
  return request({
    url: '/account/getYzm',
    method: 'get'
  })
}

export function getJsonData() {
  return request({
    url: 'https://www.easy-mock.com/mock/5cef6e9a8394f43f3cf2a53d/xinyongzhongguo-server/tree',
    method: 'get'
  })
}

