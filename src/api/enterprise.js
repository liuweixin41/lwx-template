import request from '@/utils/request'

/**
 *
 * 单位管理
 */

export function queryEnterprise(params) {
  return request({
    url: '/enterprise/getNotAuthorizeEnt',
    method: 'get',
    params
  })
}

export function addEnterprise(data) {
  return request({
    url: '/enterprise/add',
    method: 'post',
    data
  })
}

export function editEnterprise(data) {
  return request({
    url: '/enterprise/edit',
    method: 'put',
    data
  })
}

export function delEnterprise(data) {
  return request({
    url: '/enterprise/delete',
    method: 'delete',
    data
  })
}

// 修改启用或者停用
export function editEnterpriseStatus(params) {
  return request({
    url: '/enterprise/editStatus',
    method: 'get',
    params
  })
}

