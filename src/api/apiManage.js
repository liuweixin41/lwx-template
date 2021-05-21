import request from '@/utils/request'
// url链接测试
export function urlExamination(data) {
  return request({
    url: '/gateway/urlExamination',
    method: 'post',
    data
  })
}
// 獲取當前已有API列表
export function getApiAdd(data) {
  return request({
    url: '/gateway/addressPage',
    method: 'post',
    data
  })
}
// 获取协议类型
export function getProtocol() {
  return request({
    url: '/gateway/dict?type=protocol',
    method: 'get'
  })
}

// 获取流控策略列表
export function getStrategy(data) {
  return request({
    url: '/gateway/strategyPage',
    method: 'post',
    data
  })
}
// 获取流控策略类型
export function getProcessType() {
  return request({
    url: '/gateway/dict?type=strategy',
    method: 'get'
  })
}
// 分页获取api调用信息
export function getOpenup(data) {
  return request({
    url: '/gateway/apiPage',
    method: 'post',
    data
  })
}
// 获取发布状态接口
export function getReleaseStatus() {
  return request({
    url: '/gateway/dict?type=release',
    method: 'get'
  })
}
// 获取服务地址列表
export function getServerLists() {
  return request({
    url: '/gateway/serverList',
    method: 'get'
  })
}
// 分页获取，企业api管理信息
export function getCompanyApiInfo(data) {
  return request({
    url: '/gateway/enterprise/apiPage',
    method: 'post',
    data
  })
}
// 获取调用信息列表
export function getInvokingList(params) {
  return request({
    url: 'apiManage/invokingLists',
    method: 'get',
    params
  })
}
// 获取api调用列表
export function getApiDetailList(params) {
  return request({
    url: 'apiManage/getApidetail',
    method: 'get',
    params
  })
}

export function delApi(data) {
  return request({
    url: '/gateway/address',
    method: 'delete',
    data
  })
}

export function addApi(data) {
  return request({
    url: '/gateway/address',
    method: 'post',
    data
  })
}

export function editApi(data) {
  return request({
    url: '/gateway/address',
    method: 'put',
    data
  })
}

export function addStrategy(data) {
  return request({
    url: '/gateway/strategy',
    method: 'post',
    data
  })
}

export function editStrategy(data) {
  return request({
    url: '/gateway/strategy',
    method: 'put',
    data
  })
}

export function delStrategy(data) {
  return request({
    url: '/gateway/strategy',
    method: 'delete',
    data
  })
}

export function addOpenupInfo(data) {
  return request({
    url: '/gateway/api',
    method: 'post',
    data
  })
}

export function editOpenupInfo(data) {
  return request({
    url: '/gateway/api',
    method: 'put',
    data
  })
}

export function delOpenupInfo(data) {
  return request({
    url: '/gateway/api',
    method: 'delete',
    data
  })
}
// 新增API接口文档信息
export function uploadApiDoc(data) {
  return request({
    url: '/gateway/apiDoc',
    method: 'put',
    data
  })
}
// 获取API接口文档信息
export function getApiDocInfo(params) {
  return request({
    url: '/gateway/apiDoc',
    method: 'get',
    params
  })
}

export function releaseApi(params) {
  return request({
    url: 'apiManage/releaseApi',
    method: 'get',
    params
  })
}

export function offlineApi(params) {
  return request({
    url: 'apiManage/offlineApi',
    method: 'get',
    params
  })
}

// 获取当前api已授权的单位列表
export function getAuthCompany(data) {
  return request({
    url: '/gateway/apiGrantPage',
    method: 'post',
    data
  })
}
// 获取授权企业名称列表
export function getAuthAbleCompanyList() {
  return request({
    url: '/enterprise/list',
    method: 'get'
  })
}
// 获取可用流控策略列表
export function getAuthAbleStrategyList() {
  return request({
    url: '/gateway/strategyList',
    method: 'get'
  })
}
// 授权页面 获取授权有效时间类型
export function getAuthAbleTimeType() {
  return request({
    url: '/gateway/dict?type=grantType',
    method: 'get'
  })
}
// 分页获取指定API的授权信息列表 (api开放管理授权)
export function getapiGrantPage(data) {
  return request({
    url: '/gateway/apiGrantPage',
    method: 'post',
    data
  })
}
// 添加授权单位并设置流控策略
export function addAuthCompany(data) {
  return request({
    url: '/gateway/grantApi',
    method: 'post',
    data
  })
}
// 编辑一条已授权的单位
export function editAuthCompany(data) {
  return request({
    url: '/gateway/grantApi',
    method: 'put',
    data
  })
}

// 移除一个已经授权的单位
export function delAuthCompany(data) {
  return request({
    url: '/gateway/apiGrant',
    method: 'delete',
    data
  })
}
// 企业API管理，获取当前公司可用的API
export function getApiUnderCompany(params) {
  return request({
    url: '/gateway/enterprise/apiList',
    method: 'get',
    params
  })
}

// 分页获取指定企业已授权api的单位信息列表
export function getAuthedCompanyList(data) {
  return request({
    url: '/gateway/enterprise/apiOwnPage',
    method: 'post',
    data
  })
}

// 分页获取企业被授权的API列表
export function apiGrant2CenterPage(data) {
  return request({
    url: '/gateway/apiGrant2CenterPage',
    method: 'post',
    data
  })
}

// 获取企业提供接口被调用记录列表
export function getApiAccessLog(data) {
  return request({
    url: '/gateway/apiAccessLogPage',
    method: 'post',
    data
  })
}

export function getApiAccessStatisticPage(params) {
  return request({
    url: '/reportCount/getApiAccessStatisticPage',
    method: 'get',
    params
  })
}

