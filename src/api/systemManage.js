import request from '@/utils/request'

/**
 *
 * 服务管理
 */
export function getServiceGrid(params) {
  return request({
    url: '/service/grid',
    method: 'get',
    params
  })
}

export function getServiceList(params) {
  return request({
    url: '/service/list',
    method: 'get',
    params
  })
}

export function changeServiceStatus(data) {
  return request({
    url: '/service/active',
    method: 'post',
    data
  })
}

/**
 *
 * 角色管理
 */
export function getMenuList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

export function getResourceList(params) {
  return request({
    url: '/resource/list',
    method: 'get',
    params
  })
}

export function changeRoleStatus(data) {
  return request({
    url: '/role/editActive',
    method: 'post',
    data
  })
}

export function getRoleGrid(params) {
  return request({
    url: '/role/grid',
    method: 'get',
    params
  })
}

export function getSingleRole(params) {
  return request({
    url: '/role/getRole',
    method: 'get',
    params
  })
}

export function getRoleList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

export function deleteRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/role/editRole',
    method: 'post',
    data
  })
}

/**
 *
 * 用户管理
 */
export function getUserGrid(params) {
  return request({
    url: '/user/grid',
    method: 'get',
    params
  })
}

export function changeUserStatus(data) {
  return request({
    url: '/user/editActive',
    method: 'post',
    data
  })
}

export function resetPwd(data) {
  return request({
    url: '/user/resetAccountPassword',
    method: 'post',
    data
  })
}

export function unblock(data) {
  return request({
    url: '/account/releaseAccounts',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/user/editUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function getMe(params) {
  return request({
    url: '/user/getMe',
    method: 'get',
    params
  })
}

export function modifyMyInfo(data) {
  return request({
    url: '/user/modifyMyInfo',
    method: 'post',
    data
  })
}

/**
 *
 * 消息推送
 */
export function getMessageGrid(params) {
  return request({
    url: '/message/grid',
    method: 'get',
    params
  })
}

export function getMessageDeliverDetail(params) {
  return request({
    url: '/message/subscribeGrid',
    method: 'get',
    params
  })
}

export function sendMessage(data) {
  return request({
    url: '/message/send',
    method: 'post',
    data
  })
}

// 获取文件目录grid
export function getFileDir(params) {
  return request({
    url: '/fileDir/grid',
    method: 'get',
    params
  })
}

// 添加文件目录
export function addFileDir(data) {
  return request({
    url: '/fileDir/add',
    method: 'post',
    data
  })
}

// 编辑文件目录
export function editFileDir(data) {
  return request({
    url: '/fileDir/edit',
    method: 'post',
    data
  })
}

// 更新文件激活状态
export function UpdateFileDir(data) {
  return request({
    url: '/fileDir/updateActiveState',
    method: 'post',
    data
  })
}
