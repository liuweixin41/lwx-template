/* eslint-disable prefer-const */
let getStoryage = (item) => {
  let str = sessionStorage.getItem(item)
  return JSON.parse(str)
}
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  needModify: state => state.user.needModify,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  navMenu: state => state.app.navMenu,
  isDashboard: state => state.app.isDashboard,
  asyncRouterMapDynamic: state => state.user.asyncRouterMapDynamic,
  account: state => state.user.account,
  isAdmin: state => state.user.isAdmin,
  isGenratedRoutes: state => state.permission.isGenratedRoutes,
  navTopIndex: state => state.app.navTopIndex
}
export default getters
