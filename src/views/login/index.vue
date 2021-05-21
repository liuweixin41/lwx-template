<template>
  <div class="login-bg">
    <div class="login-container">
      <div>
        <!-- <div class="title-container">
          <img src="@/assets/img/login-logo.png" class="title">
        </div> -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-width="70px" label-position="right">
          <el-form-item prop="actAccount" label="用 户:">
            <el-input
              v-model="loginForm.actAccount"
              placeholder=""
              name="actAccount"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="actPassword" label="密 码:">
            <el-input
              v-model="loginForm.actPassword"
              :type="passwordType"
              :suffix-icon="isClose?'iconfont icon-yanjing-bi':'iconfont icon-yanjing1'"
              placeholder=""
              name="actPassword"
              auto-complete="on"
              @click.native="SwitchClose"
            />
          </el-form-item>

          <!-- <el-form-item prop="yzm" label="验证码:">
            <el-row :gutter="5">
              <el-col :span="12">
                <el-input
                  v-model="loginForm.yzm"
                  placeholder=""
                  name="yzm"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
              </el-col>
              <el-col :span="10">
                <img :src="imageUrl" class="yzm-img" @click="refreshYZM">
              </el-col>
            </el-row>
          </el-form-item> -->

          <el-checkbox v-model="checked" class="remember-box">记住密码</el-checkbox>

          <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from './identify.vue'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import md5 from 'js-md5'
import { getKey } from '@/api/login'
import { encrypt } from '@/utils/rsa'

export default {
  name: 'Login',
  components: { SIdentify },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateAccount = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    const validateYzm = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }

    return {
      checked: false,
      loginForm: {
        actAccount: '',
        actPassword: '',
        yzm: ''
      },
      loginRules: {
        actPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        actAccount: [{ required: true, trigger: 'blur', validator: validateAccount }],
        yzm: [{ required: true, trigger: 'blur', validator: validateYzm }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      // imageUrl: 'http://192.168.0.182:8685/user/getYzm',
      identifyCode: '',
      identifyCodeClean: '', // 超时后的验证码，用于设置验证码有效期
      identifyCodes: '1234567890',
      imageUrl: `${process.env.BASE_API}/account/getYzm`,
      isClose: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCookie()
  },
  mounted() {
    this.getPubkey()
    // this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    async getPubkey() {
      const res = await getKey()
      this.pubKey = res.data.pubKey
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.checked) {
            this.setCookie(this.loginForm.actAccount, this.loginForm.actPassword, 7, this.checked)
          } else {
            this.removeCookie()
          }
          this.loading = true
          const md5Pwd = md5(this.loginForm.actPassword)
          const userinfo = {
            actAccount: this.loginForm.actAccount,
            actPassword: encrypt(md5Pwd, this.pubKey),
            yzm: this.loginForm.yzm
          }
          this.$store.dispatch('LoginByUsername', userinfo).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.refreshYZM()
          })
        } else {
          return false
        }
      })
    },

    // 设置cookie
    setCookie(c_name, c_pwd, exdays, remeberFlag) {
      const cipherPwd = CryptoJS.AES.encrypt(c_pwd, 'secretkey123').toString()
      Cookies.set('actAccount', c_name, { expires: exdays, path: '/' })
      Cookies.set('actPassword', cipherPwd, { expires: exdays, path: '/' })
      Cookies.set('remeberFlag', remeberFlag, { expires: exdays, path: '/' })
    },

    // 读取cookie
    getCookie() {
      if (Cookies.get('remeberFlag')) {
        const cipherPwd = Cookies.get('actPassword')
        this.loginForm.actAccount = Cookies.get('actAccount')
        this.loginForm.actPassword = CryptoJS.AES.decrypt(cipherPwd, 'secretkey123').toString(CryptoJS.enc.Utf8)
        this.checked = true
      }
    },

    removeCookie() {
      Cookies.remove('remeberFlag', { path: '/' })
      Cookies.remove('actAccount', { path: '/' })
      Cookies.remove('actPassword', { path: '/' })
    },

    // 刷新验证码
    refreshYZM() {
      this.imageUrl = process.env.BASE_API + '/account/getYzm?i=' + Math.random()
      // this.imageUrl = 'http://192.168.0.182:8685/user/getYzm?i=' + Math.random()
    },

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      this.identifyCodeClean = this.identifyCode
      const self = this
      setTimeout(function() {
        self.identifyCodeClean = ''
      }, 60 * 1000)
      // console.log(this.identifyCode)
    },

    // 验证输入验证码是否正确
    checkCode() {
      this.identifyCode = this.identifyCodeClean
      return this.identifyCode === this.loginForm.yzm
    },
    // 切换眼睛图标的状态
    SwitchClose(e) {
      if (e.target.className.includes('icon-yanjing')) {
        this.isClose = !this.isClose
        this.showPwd()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    // .login-container .el-input input{
    //   &::first-line {
    //     color: $light_gray;
    //   }
    // }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      input {
        background:#efefef;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 4px;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #efefef inset !important;
          -webkit-text-fill-color: #606266 !important;
        }
      }
    }
    .el-form-item__label {
      font-size: 16px;
      font-weight: 400;
    }
    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label::before, .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before {
      content: '';
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-bg {
  min-height: 100%;
  height: 100%;
  width: 100%;
  background: url('../../assets/img/login-background.png') top right/100% 100% no-repeat;
}

.login-container {
  min-height: 100%;
  height: 100%;
  min-width: 350px;
  width: 25%;
  margin: 0 auto;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow: hidden;
  .login-form {
    max-width: 100%;
    margin: 0 auto;
    padding: 33px 35px 0 25px;
    border-radius: 6px;
    background-color: #fff;
  }
  .title-container {
    position: relative;
    text-align: center;
    .title {
      width: 80%;
      margin-bottom: 20px;
    }
  }
  .remember-box {
    margin-left: 70px;
    margin-bottom: 15px;
  }
  .login-button {
    width:calc(100% - 70px);
    margin-right: 50px;
    margin-left: 70px;
    margin-bottom:30px;
    font-size: 16px;
  }
  .yzm-img {
    width: 100px;
    height: 34px;
    cursor: pointer;
  }
}
</style>
