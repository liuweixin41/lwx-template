<!-- json to tree -->
<template>
  <div class="app-container">
    <el-table :data="dataList" border fit>
      <el-table-column prop="id" label="ID" sortable align="left"/>
      <el-table-column label="内容" align="left">
        <template slot-scope="scope">
          <el-popover
            :placement="placement"
            width="400"
            trigger="click">
            <div class="fullcontent-container">
              <el-tree
                :data="scope.row.fullcontent"
                :props="defaultProps"
                default-expand-all
                @node-click="handleNodeClick"/>
            </div>
            <span slot="reference" @click="getEvent($event)">{{ scope.row.content }}</span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getJsonData } from '@/api/login'
export default {

  components: {},
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tData: [],
      strData: '',
      dataList: [],
      placement: 'left'
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.handleGetData()
  },

  methods: {
    handleNodeClick(data) {
    },
    async handleGetData() {
      const res = await getJsonData()
      this.tData = this.jsonToTree2(res.data)
      this.strData = JSON.stringify(res.data).slice(0, 30).replace(/[\"\{\}]/g, '').concat('...')
      let i = 0
      while (i < 20) {
        this.dataList.push({ id: i, content: this.strData, fullcontent: this.tData })
        i++
      }
    },

    /**
     * 将json的数据解析成tree状，所有Array和object都解析成key为children的数据。
     * 将key和value组合成 "label": "key: vlaue"。
     * 这样在tree组件上直接展示label实际显示的就是"key: vlaue"
     */
    jsonToTree2(data) {
      const jsonData = []
      Object.keys(data).forEach(key => {
        if (typeof (data[key]) !== 'object') {
          const label = key.concat(': ').concat(data[key])
          jsonData.push({ 'label': label })
        } else if (Array.isArray(data[key])) {
          const label = key.concat(':')
          const children = []
          data[key].forEach((item, index) => {
            if (typeof (item) === 'object') {
              children.push({ 'label': '--', 'children': this.jsonToTree2(item) })
            } else {
              children.push({ 'label': item })
            }
          })
          jsonData.push({ 'label': label, 'children': children })
        } else {
          const label = key.concat(':')
          const children = []
          let i
          for (i in data[key]) {
            if (typeof (data[key][i]) === 'object') {
              children.push({ 'label': i.concat(': '), 'children': this.jsonToTree2(data[key][i]) })
            } else {
              children.push({ 'label': i.concat(': ').concat(data[key][i]) })
            }
          }
          jsonData.push({ 'label': label, 'children': children })
        }
      })
      return jsonData
    },

    getEvent(event) {
      const el = event.currentTarget // event.currentTarget 是当触发当前事件的元素
      const elOffsetTop = el.parentElement.parentElement.parentElement.offsetTop
      const docClientHeight = document.documentElement.clientHeight
      if ((elOffsetTop + 154) < 250) {
        this.placement = 'left-start'
      } else if ((docClientHeight - elOffsetTop - 154) < 200) {
        this.placement = 'left-end'
      } else {
        this.placement = 'left'
      }
      // console.log('top', (elOffsetTop + 154))
      // console.log('height', (docClientHeight - elOffsetTop - 154))
      // console.log('placement', this.placement)
      // console.log('el', el.offsetTop)
      // console.log('el.p', el.parentElement.offsetTop)
      // console.log('el.p.p', el.parentElement.parentElement.offsetTop)
      // console.log('el.p.p.p', el.parentElement.parentElement.parentElement.offsetTop)
      // console.log('clientWidth', document.documentElement.clientWidth) // document.documentElement是整个文档
      // console.log('clientHeight', document.documentElement.clientHeight)
    }
  }
}

</script>

<style lang='scss' scoped>
.fullcontent-container {
  overflow: auto;
  max-height: 400px;
}
</style>
