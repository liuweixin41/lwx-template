<!--  -->
<template>
  <div>
    <!-- 查询工具条 -->
    <el-row>
      <el-col :span="24" class="" style="padding-bottom: 0px">
        <el-form :inline="true">
          <span class="main-text">账号:</span>
          <el-input v-model="actAccount" placeholder="请输入账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <span class="main-text">姓名:</span>
          <el-input v-model="actName" placeholder="请输入姓名" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--列表-->
    <el-table v-loading="loading" :data="service" highlight-current-row border fit stripe @selection-change="selsChange">
      <el-table-column prop="serviceId" label="ID" sortable align="left"/>
      <el-table-column prop="serviceName" label="名称" sortable align="left"/>
      <el-table-column label="内容" align="left">
        <template slot-scope="scope">
          <show-more :show-height="showHeight" :content="scope.row.content"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import showMore from '@/views/tab/components/showMore'
export default {
  name: 'InterfaceA',
  components: {
    showMore
  },
  data() {
    return {
      loading: false,
      actAccount: '',
      actName: '',
      actPhone: '',
      showHeight: 20,
      service: [
        { serviceId: 1, serviceName: '中石油', content: '统一社会信用编码统一社会信用编码统一社会信用编码统一社会信用编码统一社会信用编码统一社会信用编码统一社会信用编码统一社会信用编码' },
        { serviceId: 2, serviceName: '中石化', content: '中石化中石化中石化中石化' },
        { serviceId: 3, serviceName: '中国建筑', content: '中国建筑中国建筑中国建筑中国建筑' },
        { serviceId: 4, serviceName: '中国桥梁', content: '中国桥梁中国桥梁' },
        { serviceId: 5, serviceName: '中国高铁', content: '中国高铁' }
      ]
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    handleFilter() {

    },
    selsChange() {

    }
  }
}

</script>

<style lang='scss' scoped>
</style>
