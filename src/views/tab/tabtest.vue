<!--  -->
<template>
  <div class="arrowTabContainer1">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first" disabled>
        用户管理发生的
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second" disabled>
        配置管理
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third" disabled>
        角色管理
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="fourth" disabled>
        用户管理
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fifth" disabled>
        定时任务补偿
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    handleBtnClick() {
      if (this.activeName === 'first') {
        this.activeName = 'second'
      } else if (this.activeName === 'second') {
        this.activeName = 'third'
      } else if (this.activeName === 'third') {
        this.activeName = 'fourth'
      } else if (this.activeName === 'fourth') {
        this.activeName = 'fifth'
      }
    },
    handleBtnClickOld() {
      if (this.activeName === 'fifth') {
        this.activeName = 'fourth'
      } else if (this.activeName === 'fourth') {
        this.activeName = 'third'
      } else if (this.activeName === 'third') {
        this.activeName = 'second'
      } else if (this.activeName === 'second') {
        this.activeName = 'first'
      }
    },
    handleBtnClickOldOther() {
      switch (this.activeName) {
        case 'fifth':
          this.activeName = 'fourth'
          break
        case 'fourth':
          this.activeName = 'third'
          break
        case 'third':
          this.activeName = 'second'
          break
        case 'second':
          this.activeName = 'first'
          break
      }
    }
  }
}
</script>

<style lang='scss'>
.arrowTabContainer1 {
  .el-tabs {
    .el-tabs__nav {
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      width: 100%;
    }

    .el-tabs__item {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      background-color: #34b8e2;
      color: #fff;
      position: relative;
      overflow: visible;
      padding: 0 20px;
      font-size: 14px;
    }

    // 不显示激活项下面的指示条
    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__item.is-active {
      color: #fff;
    }

    .el-tabs__item.is-active::before {
      width: 21px;
      height: 42px;
      background-color: #eee;
      border: none;
    }

    .el-tabs__item.is-active::after {
      right: 0;
      // border-color: transparent transparent transparent #34b8e2;
    }

      // 用于显示三角形，两个三角形错开重叠就会显示出箭头
    .el-tabs__item::after, .el-tabs__item::before {
      display: block;
      content: "";
      // height: 42px;
      border-width: 21px 0 21px 21px;
      border-style: dashed none dashed solid;
      position: absolute;
      top: 0;
    }

    .el-tabs__item::before {
      border-color: transparent transparent transparent #fff;
      right: 0;
    }

    .el-tabs__item::after {
      border-color: transparent transparent transparent #34b8e2;
      right: 3px;
    }

    .el-tabs__item.is-active ~ .el-tabs__item.is-disabled { // #b~p，匹配所有在#b元素之后的同级p元素。
      background-color: #eee;
      color: #bbb;
    }

    .el-tabs__item.is-active ~ .el-tabs__item.is-disabled::after {
      border-color: transparent transparent transparent #eee;
    }

    .el-tabs__item.is-active:last-child::after, .el-tabs__item.is-active:last-child::before { // .el-tabs__item.is-active:last-child 指定该元素为其父级的最后一个元素
      display: none;
    }

    .el-tabs__item.is-active ~ .el-tabs__item.is-disabled:last-child::before {
      display: none;
    }
  }

  .el-tabs.fourItem .el-tabs__item {
    width: 25%;
  }

  // ::selection {
	// background: #34b8e2;
	// color: #fff;
  // }

}

</style>
