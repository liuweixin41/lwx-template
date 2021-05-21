/* eslint-disable prefer-const */
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
const commonFn = {
  loading(msg) {
    const loadingMsg = msg || '处理中'
    return Loading.service({
      lock: false,
      text: loadingMsg,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
  },
  downloadFile(url) {
    let baseURL = process.env.BASE_API
    url = baseURL + url
    let xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.setRequestHeader('ACCESS-TOKEN', getToken())
    xhr.responseType = 'blob'
    let formData = new FormData()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const blob = new Blob([xhr.response])
        let url = window.URL.createObjectURL(blob)
        // 创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
        let link = document.createElement('a')
        link.href = url
        link.style.display = 'none'
        // 取出下载文件名
        let fileName
        if (xhr.getResponseHeader('content-disposition')) {
          fileName = decodeURI(xhr.getResponseHeader('content-disposition').split(';')[1].split('=')[1])
        } else {
          fileName = new Date().getTime().toString() + 'docx'
        }
        link.setAttribute('download', fileName)
        link.click()
        window.URL.revokeObjectURL(url)
      }
    }
    xhr.send(formData)
  },
  downFilePost(url, params) {
    let baseURL = process.env.BASE_API
    url = baseURL + url
    let xhr = new XMLHttpRequest()
    xhr.open('post', url, true)
    xhr.responseType = 'blob'
    // 设置请求头
    xhr.setRequestHeader('Content-Type', 'application/json')
    // let formData = new FormData()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.response.type === 'multipart/form-data') {
          const blob = new Blob([xhr.response])
          let url = window.URL.createObjectURL(blob)
          // 创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
          let link = document.createElement('a')
          link.href = url
          link.style.display = 'none'
          // 取出下载文件名
          let fileName
          if (xhr.getResponseHeader('content-disposition')) {
            fileName = decodeURI(xhr.getResponseHeader('content-disposition').split(';')[1].split('=')[1])
          } else {
            fileName = new Date().getTime().toString()
          }
          link.setAttribute('download', fileName)
          link.click()
          window.URL.revokeObjectURL(url)
        } else {
          Message.error({
            message: '该接口没有接口文档',
            type: 'error',
            duration: 2 * 1000
          })
        }
      }
    }
    xhr.send(JSON.stringify(params))
  },
  exportExcel(url, params) {
    let baseURL = process.env.BASE_API
    url = baseURL + url
    let xhr = new XMLHttpRequest()
    xhr.open('post', url, true)
    xhr.responseType = 'blob'
    // 设置请求头
    xhr.setRequestHeader('Content-Type', 'application/json')
    // let formData = new FormData()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const blob = new Blob([xhr.response])
        let url = window.URL.createObjectURL(blob)
        // 创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
        let link = document.createElement('a')
        link.href = url
        link.style.display = 'none'
        // 取出下载文件名
        let fileName
        if (xhr.getResponseHeader('content-disposition')) {
          fileName = decodeURI(xhr.getResponseHeader('content-disposition').split(';')[1].split('=')[1])
        } else {
          fileName = new Date().getTime().toString()
        }
        link.setAttribute('download', fileName)
        link.click()
        window.URL.revokeObjectURL(url)
      }
    }
    xhr.send(JSON.stringify(params))
  },
  async downloadFn(url, params) {
    let baseURL = process.env.BASE_API
    url = baseURL + url
    const result = await axios.post(
      url,
      {
        params
        // responseType: 'blob'
      }
    )
    const response = await this.judgeErrorByResponseType(result)
    this.downloadBlob(response)
  },
  // 通用的下载函数
  downloadBlob(response, fileName) {
    const blob = new Blob([response.data], { type: 'multipart/form-data' })
    if (fileName === undefined) {
      fileName = decodeURIComponent(
        response.headers['content-disposition'].split(';')[1].split('=')[1]
      )
    }
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      const linkElement = document.createElement('a')
      linkElement.download = fileName
      linkElement.style.display = 'none'
      linkElement.href = URL.createObjectURL(blob)
      document.body.appendChild(linkElement)
      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('click', false, false)
      linkElement.dispatchEvent(clickEvent)
      URL.revokeObjectURL(linkElement.href) // 释放URL 对象
      document.body.removeChild(linkElement)
    }
  },
  judgeErrorByResponseType(response) {
    return new Promise((resolve, reject) => {
      if (response.headers['content-type'].includes('json')) {
        // 此处拿到的data才是blob
        const { data } = response
        /* const reader = new FileReader()
        reader.onload = () => {
          const { result } = reader
          const errorInfos = JSON.parse(result)
          const { msg } = errorInfos
          reject(new Error(msg))
        }
        reader.onerror = err => {
          reject(err)
        }
        let msg = reader.readAsText(data) */
        Message.error({
          message: data.message,
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        resolve(response)
      }
    })
  },
  // 数组对象位置互换
  swapArray(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
  },
  getArrayIndex(arr, obj) {
    let i = arr.length
    while (i--) {
      if (arr[i] === obj) {
        return i
      }
    }
    return -1
  }

}
export default commonFn
