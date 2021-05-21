<!--  -->
<template>
  <div class="app-container flex">
    <!-- 企业信息 -->
    <div class="left-side">
      <div class="title">单位列表</div>
      <el-input
        v-model.trim="filterText"
        placeholder="输入内容"
        size="mini"
        suffix-icon="el-icon-search"
        class="search-input"/>
      <div class="tree-wrap">
        <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="p20-scrollbar__view">
          <el-tree
            ref="tree"
            :data="enterpriseList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            default-expand-all
            node-key="id"
            @node-click="handleNodeClick"/>
        </el-scrollbar>
      </div>
    </div>

    <div class="right-side flex-1">
      <!--列表-->
      <el-table v-loading="loading" :data="apiCallList" highlight-current-row border fit stripe>
        <el-table-column prop="appName" label="应用名称" align="left"/>
        <el-table-column prop="description" label="应用说明" align="left"/>
        <el-table-column prop="ip" label="IP地址" align="left"/>
        <el-table-column prop="port" label="端口" align="left"/>
        <el-table-column prop="addTime" label="添加时间" width="180" align="left"/>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope" >
            <el-button type="text" size="medium" @click="viewDetail(scope)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          :current-page="pageNum"
          background
          style="float:right;"
          layout="total, prev, pager, next, sizes"
          @current-change="handleCurrentChange"
          @size-change="changePageSize"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      account: '',
      typeList: [], //  操作类型
      searchType: '', //  搜索操作类型
      loading: false,
      dialogVisible: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      apiCallList: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      enterpriseList: []
    }
  },

  computed: {},

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {},

  mounted() {
    this.generateDemoData()
  },

  methods: {
    generateDemoData() {
      this.typeList = [
        { operationId: 0, operationType: '新增' },
        { operationId: 1, operationType: '修改' },
        { operationId: 2, operationType: '删除' }
      ]

      let i = 0
      while (i < 28) {
        this.enterpriseList.push({
          id: i,
          label: 'ICBC'.concat(i)
        })
        i++
      }

      let x = 0
      while (x < 8) {
        this.apiCallList.push({
          id: x,
          appName: '内部应用1',
          description: '内部应用1',
          ip: '192.168.0.129',
          port: '8001',
          addTime: '2019-06-05 19:23:54'
        })
        x++
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    // query() {
    //   this.loading = true
    //   const para = {
    //     roeName: this.roleName,
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize
    //   }
    //   getMessageGrid(para).then(res => {
    //     this.rolesList = res.data.list
    //     this.total = res.data.total
    //     this.loading = false
    //   }).catch(res => {
    //     this.loading = false
    //   })
    // },

    handleFilter() {
      this.pageNum = 1
      this.query()
    },

    changePageSize(size) {
      this.pageSize = size
      this.query()
    },

    // 改变页面
    handleCurrentChange(val) {
      this.pageNum = val
      this.query()
    },

    handleNodeClick() {

    },

    viewDetail() {
      this.dialogVisible = true
    }
  }
}

</script>

<style lang='scss'>
.left-side{
  .el-tree-node__expand-icon.is-leaf{ // 去除el-tree左边的三角形
    display: none;
  }
  .el-tree-node.is-current > .el-tree-node__content{ // 当前选中项
    background-color: #34b8e2;
    color: #fff;
  }
  .el-tree-node__content {
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-tree-node:first-child{
    border-top: 1px solid #dcdfe6;
  }
}

.el-scrollbar__wrap.default-scrollbar__wrap {
  overflow-x: auto;
}
</style>

<style lang='scss' scoped>
.left-side{
  width: 200px;
  // height: 400px;
  // overflow: auto;
  border-right: 1px solid #dcdfe6;
  padding-right: 10px;
  margin-right: 10px;
  .title{
    background-color: #34b8e2;
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .search-input{
    margin: 5px 0;
  }
}

.tree-wrap{
  height: 350px;
}

.default-scrollbar {
  width: 100%;
  height: 100%;
}
</style>
