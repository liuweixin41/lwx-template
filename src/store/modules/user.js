/* eslint-disable prefer-const */
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, setLoginAcount, getLoginAcount, setIsAdmin, getIsAdmin, getMenus, setMenus, removeMenus } from '@/utils/auth'
import { getNeedModify, setNeedModify, removeNeedModify } from '@/utils/auth'
import commonFn from '@/utils/global'

const user = {
  state: {
    user: '',
    account: getLoginAcount(),
    isAdmin: getIsAdmin(),
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    needModify: getNeedModify(),
    setting: {
      articlePlatform: []
    },
    asyncRouterMapDynamic: getMenus()
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NEEDMODIFY: (state, needModify) => {
      state.needModify = needModify
    },
    SET_asyncRouterMapDynamic: (state, asyncRouterMapDynamic) => {
      state.asyncRouterMapDynamic = asyncRouterMapDynamic
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_ISADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const actAccount = userInfo.actAccount.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(actAccount, userInfo.actPassword, userInfo.yzm).then(response => {
          const data = response.data
          commit('SET_TOKEN', data['token'])
          commit('SET_NAME', data.actName)
          commit('SET_ACCOUNT', data.actAccount)
          commit('SET_ISADMIN', data.admin)
          commit('SET_NEEDMODIFY', data.needModifyPassword)
          /* 需要将返回的菜单中的'数据字典'和'个人中心'交换位置。前端这边根据返回的数组对象交换位置
             后面可以和后端沟通下从返回的数据上改下
          */
          let SystemDataDictionaryIndex = 0
          let SystemSelfIndex = 0
          data.menus.forEach((item) => {
            /**
             * @param SystemDataDictionaryIndex 数据字典在menus数组里的index
             * @param SystemSelfIndex 个人中心在menus数组里的index
             */
            /**
             * 后端返回的menus对应的id可在localStorage中查看
             * id 32 为数据字典菜单
             * id 21 为个人中心菜单
             */
            if (item.id === 32) {
              SystemDataDictionaryIndex = commonFn.getArrayIndex(data.menus, item)
            }
            if (item.id === 21) {
              SystemSelfIndex = commonFn.getArrayIndex(data.menus, item)
            }
          })
          let switchedMenus = commonFn.swapArray(data.menus, SystemDataDictionaryIndex, SystemSelfIndex)
          commit('SET_asyncRouterMapDynamic', switchedMenus) // 根据后台返回的menus设置路由。 因为有需求个人中心和数据字典的菜单需要交换位置所以在这里处理了。
          setToken(data['token'])
          setIsAdmin(data.admin)
          setLoginAcount(data.actAccount)
          setMenus(data.menus)
          setNeedModify(data.needModifyPassword)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       // 由于mockjs 不支持自定义状态码只能这样hack
    //       if (!response) {
    //         reject('Verification failed, please login again.')
    //       }
    //       const data = response.data

    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //         commit('SET_asyncRouterMapDynamic', data.asyncRouterMapDynamic) // 设置后台返回的路由
    //       } else {
    //         reject('getInfo: roles must be a non-null array!')
    //       }

    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }, accountInfo) {
      return new Promise((resolve, reject) => {
        logout({ account: accountInfo.account }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeMenus()
          removeNeedModify()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    },

    // 设置后台获取的路由
    SetAsyncRouterMapDynamic({ commit, dispatch }, asyncRouterMapDynamic) {
      return new Promise(resolve => {
        commit('SET_asyncRouterMap', asyncRouterMapDynamic)
        resolve()
      })
    }
  }
}

export default user
