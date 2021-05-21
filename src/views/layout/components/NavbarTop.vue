<template>
  <div class="navbar-top">
    <div class="logo-container" @click="jumpToPage('/')">
      <img src="@/assets/img/title-logo.png" class="topbar-logo">
      <!-- <div class="topbar-logo-text">
        <div class="big">信用中国</div>
        <div class="small">CREDITCHINA.GOV.CN</div>
      </div> -->
    </div>
    <!-- <div>
      <el-menu
        :default-active="defaultActiveIndex"
        :router="true"
        :background-color="variables.navBarTopBg"
        :text-color="variables.navBarTopText"
        :active-text-color="variables.navBarTopTextActive"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item
          v-for="item in shouldShowRoutes"
          :key="item.path"
          :index="item.path" >
          <template slot="title">
            <navitem :icon="item.meta.icon||item.meta.icon" :title="item.meta.title"/>
          </template>
        </el-menu-item>
      </el-menu>
    </div> -->
    <div class="right-menu flex flex-align-items-center ">
      <template>
        <!-- <search class="right-menu-item" />
          <error-log class="errLog-container right-menu-item hover-effect"/>
          <screenfull class="right-menu-item hover-effect"/>
          <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
            <size-select class="right-menu-item hover-effect"/>
          </el-tooltip>
          <lang-select class="right-menu-item hover-effect"/>
          <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
            <theme-picker class="right-menu-item hover-effect"/>
          </el-tooltip> -->
        <el-dropdown class="right-menu-item hover-effect">
          <div class="avatar-wrapper flex flex-align-items-center">
            <div class="question"><svg-icon icon-class="question-mark"/></div>
            <div class="user-font">
              关于<i class="el-icon-arrow-down el-icon--right"/>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <about/>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="separation-line"/>
        <el-dropdown class="right-menu-item hover-effect" trigger="hover" placement="bottom">
          <div class="avatar-wrapper flex flex-align-items-center">
            <div class="user-avatar"><svg-icon icon-class="user"/></div>
            <div class="user-font">
              {{ account }}<i class="el-icon-arrow-down el-icon--right"/>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <modify-pwd/>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-tooltip content="退出" effect="dark" placement="bottom" class="right-menu-item hover-effect">
          <div class="avatar-wrapper">
            <svg-icon icon-class="logout" class-name="user-avatar" @click="logout"/>
          </div>
        </el-tooltip> -->
      </template>
    </div>
  </div>
</template>

<script>
import Navitem from './Navitem'
import ModifyPwd from './ModifyPwd'
import About from './About'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { getIsAdmin, getLoginAcount } from '@/utils/auth'

export default {
  components: {
    Navitem,
    ModifyPwd,
    About
  },
  data() {
    return {
      defaultActiveIndex: this.navIndex() ? this.navIndex() : '/',
      loading: false,
      nickname: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'name',
      'avatar',
      'device',
      'navTopIndex'
    ]),
    variables() {
      return variables
    },
    isAdmin() {
      return (getIsAdmin() === 'true')
    },
    account() {
      return getLoginAcount()
    },
    path() {
      return this.$route.path
    },
    shouldShowRoutes() {
      const arr = []
      this.permission_routers.forEach((item, index) => {
        if (!item.hidden && item.children) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  watch: {
    path: function(newQuestion, oldQuestion) {
      this.defaultActiveIndex = this.navTopIndex
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut', { account: this.account }).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleSelect(index) {
      this.defaultActiveIndex = index
      this.$store.commit('SET_NAVTOPINDEX', index)
      const routers = this.permission_routers // 获取路由对象
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].path === index) {
          this.$store.commit('CHANGE_NAVMENU', routers[i].children)
        }
      }
    },
    jumpToPage(routePath) {
      this.$store.commit('SET_NAVTOPINDEX', routePath)
      this.$router.push({ path: routePath })
    },
    navIndex() {
      return this.$store.getters.navTopIndex
    }
  }
}
</script>

<style lang="scss">
.navbar-top {
  .el-menu-item {
    font-size:15px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.navbar-top {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  min-width: 1000px;
  background: -webkit-linear-gradient(left, #f2503a , #f23a3a); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #f2503a , #f23a3a); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #f2503a , #f23a3a); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #f2503a , #f23a3a); /* 标准的语法（必须放在最后） */
  // box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  transition: margin-left .18s;
    z-index: 1002;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    .logo-container {
      width: 250px;
      height: 50px;
      cursor: pointer;
      .topbar-logo {
        width: 250px;
        position: absolute;
        top: 15px;
        left: 15px;
      }
      .topbar-logo-text {
        position: absolute;
        left: 55px;
        top: 9px;
        color: $navBarTopLogo;
        display: inline-block;
        .big {
          font-size: 22px;
        }
        .small {
          font-size: 8px;
        }
      }
    }
  .el-menu.el-menu--horizontal {  // 这里两个类名连接的作用是当元素同时拥有这两个类，此规则才生效
    border-bottom: solid 0 #e6e6e6;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  .right-menu {
    float: right;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 10px;
    text-align:right;

    &:focus {
      outline: none;
    }

    .separation-line{
      width: 1px;
      height: 14px;
      background: $navBarTopText;
    }

    .right-menu-item {
      padding: 0 8px;
      font-size: 16px;
      color: $navBarTopText;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-wrapper {
      margin-top: 0px;
      position: relative;
      cursor: pointer;
    }
    .question {
      padding-right: 5px;
      font-size: 20px;
    }
    .user-avatar {
      padding-right: 5px;
    }
    .user-font {
      font-size: 12px;
    }
    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -15px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>

