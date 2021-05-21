<template>
  <div>
    <span
      @click="dialogVisible = true">修改密码
    </span>

    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="canClose"
      :close-on-press-escape="canClose"
      :show-close="canClose"
      :append-to-body="true"
      title="修改密码"
      width="40%">
      <el-form ref="form" :model="modifyPwdForm" :rules="formRules" label-width="80px" label-position="left">
        <el-form-item label="旧密码" prop="actPassword">
          <el-input v-model="modifyPwdForm.actPassword" :maxlength="20" type="password" placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="modifyPwdForm.newPassword" :maxlength="20" type="password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="modifyPwdForm.confirmPassword" :maxlength="20" type="password" placeholder="确认密码" />
        </el-form-item>
      </el-form>

      <div style="text-align:right;">
        <el-button v-if="canClose" type="default" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { modifyPwd, getKey } from '@/api/login'
import { encrypt } from '@/utils/rsa'
import { getNeedModify } from '@/utils/auth'

export default {
  components: {
  },
  data() {
    const validatePass = (rule, value, callback) => {
      const regex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`.~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`.~()-+=]+$)(?![0-9\W_!@#$%^&*`.~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`.~()-+=]{8,80}$')
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regex.test(value)) {
        callback(new Error('密码需要大于8位，包含大小写字母和特殊字符。'))
      } else {
        if (this.modifyPwdForm.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyPwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      defaultActiveIndex: '/',
      loading: false,
      nickname: '',
      dialogVisible: false,
      canClose: true,
      pubKey: '',
      modifyPwdForm: {
        actPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        actPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'name',
      'avatar',
      'device',
      'needModify'
    ]),
    variables() {
      return variables
    },
    isNeedModify() {
      return (getNeedModify() === 'true')
    }
  },
  watch: {},

  mounted() {
    this.checkModify()
    this.getPubkey()
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut', { account: this.account }).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    async getPubkey() {
      const res = await getKey()
      this.pubKey = res.data.pubKey
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const para = {
            password: encrypt(this.modifyPwdForm.actPassword, this.pubKey),
            newPassword: encrypt(this.modifyPwdForm.newPassword, this.pubKey),
            confirmPassword: encrypt(this.modifyPwdForm.confirmPassword, this.pubKey)
          }
          modifyPwd(para).then((res) => {
            this.dialogVisible = false
            this.$refs.form.resetFields()
            const self = this
            setTimeout(function() {
              self.logout()
            }, 1000)
          }).catch(() => {
            // this.dialogVisible = false
            // this.$refs['form'].resetFields()
          })
        }
      })
    },

    // 检查是否需要强制修改密码
    checkModify() {
      if (this.isNeedModify) {
        this.dialogVisible = true
        this.canClose = false
      }
    }
  }
}
</script>

