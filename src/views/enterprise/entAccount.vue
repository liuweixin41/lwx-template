<template>
  <div class="app-container">
    <el-form ref="searchForm" :inline="true" :model="queryCondition" class="querybar">
      <el-form-item label="单位账号" prop="entAccount">
        <el-input
          v-model.trim="queryCondition.entAccount"
          :maxlength="50"
          placeholder="单位账号"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="单位名称" prop="entName">
        <el-input
          v-model.trim="queryCondition.entName"
          :maxlength="50"
          placeholder="单位名称"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="当前状态" prop="status">
        <el-select v-model="queryCondition.status" class="filter-item">
          <el-option label="全部" value=""/>
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleFilter">查询</el-button>
        <el-button v-if="!isView" type="primary" size="medium" @click="handleAdd">新增</el-button>
        <el-button v-if="isView" type="primary" size="medium" @click="handleBack">返回</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row border fit>
      <el-table-column prop="entAccount" label="单位账号" align="left"/>
      <el-table-column prop="entName" label="单位名称" align="left"/>
      <el-table-column v-if="!isView" label="SecretKey">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleCopy(scope.row, $event)">
            复制密码
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="当前状态" class-name="status-col">
        <template slot-scope="{row}">
          {{ row.entStatu | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column v-if="!isView" label="操作" align="center" width="250">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.entStatu===0" type="text" @click="switchStatus(row)">启用</el-button>
          <el-button v-if="row.entStatu===1" type="text" @click="switchStatus(row)">禁用</el-button>
          <el-button type="text" @click="handleEdit(row)">修改</el-button>
          <el-button type="text" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination :total="total" :page.sync="pageOption.page" :limit.sync="pageOption.limit" @pagination="query" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%" @close="resetForm">
      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="80px" style="width:70%; margin-left:50px;">
        <el-form-item label="单位账号" prop="entAccount">
          <el-input
            v-model.trim="formData.entAccount"
            :disabled="dialogStatus==='edit'"
            :max-length="50"
            onkeyup="value=value.replace(/[^a-zA-Z0-9_]/g,'');"
            placeholder="只能输入英文字母或者数字"
          />
        </el-form-item>
        <el-form-item label="单位名称" prop="entName">
          <el-input
            v-model.trim="formData.entName"
            :max-length="50"
            placeholder="请输入单位名称"
          />
        </el-form-item>
        <el-form-item label="当前状态" prop="entStatu">
          <el-select v-model="formData.entStatu" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="entContacts">
          <el-input v-model.trim="formData.entContacts" :max-length="50"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="entMobile">
          <el-input v-model.trim="formData.entMobile" :max-length="50"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogStatus==='add'?createData():updateData()">
          确定
        </el-button>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { addEnterprise, queryEnterprise, editEnterprise, delEnterprise, editEnterpriseStatus } from '@/api/enterprise'
export default {
  name: 'EntAccount',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '禁用',
        1: '启用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      queryCondition: {
        entAccount: '',
        entName: '',
        status: ''
      },
      pageOption: {
        page: 1,
        limit: 10
      },
      total: 0,
      listLoading: false,
      tableData: [],
      statusList: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ],
      formData: {
        entAccount: '',
        entName: '',
        entStatu: 1,
        entContacts: '',
        entMobile: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        edit: '编辑单位',
        add: '新增单位'
      },
      rules: {
        entAccount: [{ required: true, message: '请填写单位账号', trigger: 'blur' }],
        entName: [{ required: true, message: '请填写单位名称', trigger: 'blur' }]
      },
      statusOptions: [
        {
          label: '禁用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ]
    }
  },
  computed: {
    isView() {
      return this.$route.query.isView === '1'
    }
  },
  created() {
    this.query()
  },
  methods: {
    handleFilter() {
      this.pageOption.page = 1
      this.query()
    },
    // 获取数据
    query() {
      this.listLoading = true
      const params = {
        entAccount: this.queryCondition.entAccount,
        entName: this.queryCondition.entName,
        entStatu: this.queryCondition.status,
        orderBy: 'entAddTime desc',
        pageNum: this.pageOption.page,
        pageSize: this.pageOption.limit,
        paging: true
      }
      queryEnterprise(params).then(res => {
        if (res.success) {
          this.listLoading = false
          this.tableData = [...res.data.list]
          this.total = res.data.total
          this.pageOption.page = res.data.pageNum
          this.pageOption.limit = res.data.pageSize
        }
      }, err => { if (err) this.listLoading = false })
    },
    // 复制密码
    handleCopy(row, event) {
      clip(row.entSecretkey, event)
    },
    handleAdd() {
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    handleBack() {
      this.$router.go(-1)
    },
    switchStatus(row) {
      const params = {
        id: row.entId,
        status: 1 - row.entStatu
      }
      editEnterpriseStatus(params).then(res => {
        if (res.success) {
          this.query()
        }
      })
    },
    resetForm() {
      console.log('触发reset')
      this.$refs['dataForm'].resetFields()
      this.$refs['dataForm'].clearValidate()
    },
    handleEdit(row) {
      this.formData = { ...row }
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = []
        params.push(row.entId)
        delEnterprise({
          parameter: params
        }).then(res => {
          if (res.success) {
            this.query()
          }
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            entAccount: this.formData.entAccount,
            entContacts: this.formData.entContacts,
            entMobile: this.formData.entMobile,
            entName: this.formData.entName,
            entStatu: this.formData.entStatu
          }
          addEnterprise(params).then(res => {
            if (res.success) {
              this.dialogFormVisible = false
              this.$refs['searchForm'].resetFields()
              this.query()
            }
          }, err => {
            if (err) this.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) return
        const params = {
          entId: this.formData.entId,
          entAccount: this.formData.entAccount,
          entContacts: this.formData.entContacts,
          entMobile: this.formData.entMobile,
          entName: this.formData.entName,
          entStatu: this.formData.entStatu
        }
        editEnterprise(params).then(res => {
          if (res.success) {
            this.dialogFormVisible = false
            this.$refs['searchForm'].resetFields()
            this.query()
          }
        }, err => {
          if (err) this.dialogFormVisible = false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
