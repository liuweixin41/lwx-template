import Cookies from 'js-cookie'
import LStorage from './LStorage'

const TokenKey = 'access-token'
const IsAdminKey = 'isAdmin'
const LoginAcount = 'LoginAcount'
const Menus = 'menus'
const NeedModify = 'NeedModify'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getIsAdmin() {
  return Cookies.get(IsAdminKey)
}

export function setIsAdmin(isAdmin) {
  return Cookies.set(IsAdminKey, isAdmin)
}

export function removeIsAdmin() {
  return Cookies.remove(IsAdminKey)
}

export function getLoginAcount() {
  return Cookies.get(LoginAcount)
}

export function setLoginAcount(loginAcount) {
  return Cookies.set(LoginAcount, loginAcount)
}

export function removeLoginAcount() {
  return Cookies.remove(LoginAcount)
}

export function getMenus() {
  return LStorage.getItem(Menus)
}

export function setMenus(menus) {
  return LStorage.setItem(Menus, menus)
}

export function removeMenus() {
  return LStorage.removeItem(Menus)
}

export function getNeedModify() {
  return Cookies.get(NeedModify)
}

export function setNeedModify(needModify) {
  return Cookies.set(NeedModify, needModify)
}

export function removeNeedModify() {
  return Cookies.remove(NeedModify)
}

