import { asyncRouterMap, constantRouterMap } from '@/router'
import { deepClone } from '@/utils'
// const _import = require('@/utils/_import_' + process.env.NODE_ENV) // 获取组件的方法
// import Layout from '@/views/layout/Layout' // Layout 是架构组件，不在后台返回，在文件里单独引入

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

function hasRouteName(name, route) {
  if (route.name) {
    return route.name === name
  } else {
    return false
  }
}

function filterAsyncRouter(routes, arr2) {
  const res = []
  for (let i = 0; i < arr2.length; i++) {
    routes.forEach(route => {
      const tmp = { ...route }
      console.log('tmp', tmp)
      if (hasRouteName(arr2[i].name, tmp)) {
        if (tmp.children) {
          /* 数据对账详情（DataManageDataCheck） 页面信用查询报表（ReportCatalogQuery） 内部API查询报表（ReportApiQuery）中心接口授权管理(Openup)
             这几个页面还存在内嵌页面（表现形式就是点击查看详情后跳转到一个新页面）。在路由表中就是三级路由（children的children）。 这些三级路由不参与路由权限的
             控制。所以后台返回那些路由当前账号可用时，并不会返回这些三级路由。需要自己去添加进去。
          */
          if (tmp.name === 'DataManageDataCheck' || tmp.name === 'ReportCatalogQuery' || tmp.name === 'ReportApiQuery' || tmp.name === 'Openup' || tmp.name === 'CompanyApi') {
            tmp.children = deepClone(route.children)
          } else {
            tmp.children = filterAsyncRouter(tmp.children, arr2)
          }
        }
        res.push(tmp)
      }
    })
  }
  const unfound = { path: '*', redirect: '/404', hidden: true } // 在动态路由最后添加404页面的路由
  res.push(unfound)
  console.log('最终的路由结果', res)
  return res
}

/**
 * 递归过滤后台返回的动态异步路由表，返回符合的路由表
 * @param routes asyncRouterMapDynamic
 */
// function filterAsyncRouterDynamic(asyncRouterMapDynamic) { // 遍历后台传来的路由字符串，转换为组件对象
//   const accessedRouters = asyncRouterMapDynamic.filter(route => {
//     if (route.component) {
//       if (route.component === 'Layout') { // Layout组件特殊处理
//         route.component = Layout
//       } else {
//         route.component = _import(route.component)
//       }
//     }
//     if (route.children && route.children.length) {
//       route.children = filterAsyncRouterDynamic(route.children)
//     }
//     return true
//   })
//   const unfound = { path: '*', redirect: '/404', hidden: true } // 在动态路由最后添加404页面的路由
//   accessedRouters.push(unfound)
//   return accessedRouters
// }

const permission = {
  state: {
    routers: [],
    addRouters: [],
    isGenratedRoutes: false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_IsGenratedRoutes: (state, isGenratedRoutes) => {
      state.isGenratedRoutes = isGenratedRoutes
    }
  },
  actions: {
    GenerateRoutes({ commit, rootGetters }, data) {
      return new Promise(resolve => {
        const { isAdmin } = data
        let accessedRouters
        if (isAdmin === true) {
          accessedRouters = asyncRouterMap
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          // accessedRouters = filterAsyncRouterDynamic(rootGetters.asyncRouterMapDynamic)
          accessedRouters = filterAsyncRouter(asyncRouterMap, rootGetters.asyncRouterMapDynamic)
        }
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_IsGenratedRoutes', true)
        resolve()
      })
    }
  }
}

export default permission
