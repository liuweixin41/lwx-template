const data = {
  '统一社会信用编码': 'SHXYBM000001',
  '机构全称': '北京呼啦啦科技有限公司',
  '参保起始日期': '2017-07-25',
  '人数': 67,
  '单位参保缴费状态': '参保中',
  '参保人员': ['张三', '王增量', '李中姬']
}

function jsonToTree(data) {
  const jsonData = []
  Object.keys(data).forEach(key => {
    console.log('type', typeof (data[key]))
    if (typeof (data[key]) !== 'object') {
      const label = key.concat(': ').concat(data[key])
      jsonData.push({ 'label': label })
    } else if (Array.isArray(data[key])) {
      const label = key.concat(':')
      const children = []
      // console.log(data[key])
      // console.log('keys', Object.keys(data[key]))
      // console.log(typeof (data[key]))
      data[key].forEach(item => {
        if (typeof (item) === 'object') {
          item = jsonToTree(item)
        }
        children.push({ 'label': item })
      })
      jsonData.push({ 'label': label, 'children': children })
    } else {
      const label = key.concat(':')
      const children = []
      let i
      for (i in data[key]) {
        children.push({ 'label': i.concat(': ').concat(data[key][i]) })
      }
      jsonData.push({ 'label': label, 'children': children })
    }
  })
  return jsonData
}

const result = jsonToTree(data)
console.log(result)
