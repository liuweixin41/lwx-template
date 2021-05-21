<!--  -->
<template>
  <div class="container app-container">
    <div class="left-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="接口管理" name="first" class="tree-container">
          <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="p20-scrollbar__view">
            <el-tree
              :data="data"
              :props="defaultProps"
              :default-expanded-keys="[1]"
              node-key="id"
              @node-click="handleNodeClick"/>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second" class="tree-container">
          <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="p20-scrollbar__view">
            <el-tree
              :data="data"
              :props="defaultProps"
              :default-expanded-keys="[2, 3]"
              node-key="id"
              @node-click="handleNodeClick"/>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div :class="classObj" class="right-container">
      <div :is="interfaceComponent"/>
      <!-- <InterfaceA/> -->
    </div>
  </div>
</template>

<script>
import InterfaceA from './components/InterfaceA'
import InterfaceB from './components/InterfaceB'
export default {
  components: {
    InterfaceA,
    InterfaceB
  },
  data() {
    return {
      interfaceComponent: '',
      activeName: 'first',
      noData: true,
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  computed: {
    classObj() {
      return {
        noDataClass: this.noData
      }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    interfaceFilter(inter) {
      const interfaceComponentMap = {
        '一级 1': 'interfaceA',
        '一级 2': 'interfaceB'
      }
      return interfaceComponentMap[inter]
    },

    handleNodeClick(data) {
      console.log(data)
      console.log(this.interfaceFilter(data.label))
      this.noData = !((this.interfaceFilter(data.label) === '' && this.interfaceFilter(data.label) === 'undefined'))
      this.interfaceComponent = this.interfaceFilter(data.label)
      // if (data.label === '一级 1') {
      //   this.interfaceComponent = 'interfaceA'
      // } else {
      //   this.interfaceComponent = 'interfaceB'
      // }
    },
    handleClick() {

    }
  }
}

</script>

<style>
.el-scrollbar__wrap.default-scrollbar__wrap {
  overflow-x: auto;
}
/* .el-scrollbar__view.default-scrollbar__view {} */
/* .el-scrollbar__view.p20-scrollbar__view {
  padding-right: 20px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
} */
</style>

<style lang='scss' scoped>
.container {
  display:flex;
  flex-flow: row nowrap;
  height: 100%;
}
.left-container {
  // background:#f00;
  width: 280px;
  height: auto;
  border-right: 1px solid #eee;
  flex:none;
  margin-right: 20px;
  padding-right: 20px;
  overflow: auto;
}
.right-container {
  // display:inline-block;
  // background:#0f0;
  height: 100%;
  // width:calc(100% - 310px);
  // border: 1px solid #2c1e1e;
  flex:1;
}
.right-up {
  background:#0f0;
}
.right-down {
  background:rgb(210, 216, 210);
}
.default-scrollbar {
  width: 100%;
  height: 100%;
}
.flex-scrollbar {
  width: auto;
  height: auto;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.tree-container {
  height:200px
}
.noDataClass{
  height: 300px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAC8BAMAAAB29C0bAAAAFVBMVEUAAACytbeytbeytbeytbeytbeytbdzz482AAAABnRSTlMARGbfu5nVr39ZAAABhUlEQVR42u3UvW6jQBTF8cOXa4pk6qwsUSNr43pW66S2ZCU1Myzz/o+wlzGx8wKeNP+fBEg0HJ07XAEAAAAAAAAAAAAAAAAAAAD4YUOvn3fS6njWXZR2L/lZRpXMPqVeTcoW7RXbs5OJVVo9vqrWS81WQ+Nlnn383V+uIYIk9/gQQx+/h8iidEwpWC2FQrxb341dk6RdDpPMn0mXcuMw0U6hdXELoSaqDTrlcVhLrkyIYRuIe9FqTt4FvX2F0MPVVvf8ap+q0mYc7GB+HHS4jSPo8WI16upvjhUUm/5kJWgJU5Em8sk0eRDLdfyfdt/Xk3ZzXSrESdoWZBdcv60vuSdfT7Eei4dwPjfReF3UHO1N7N4K/aL3cRxlIbownLWoniXF9mMssqzuTbQhh5ie5m5SnSTF3XPpEO/9+r12VGO9uE8vxX23hig4jt2UV2bj5dJY/aujFF+7ZMo1US3b6urdosvgNfxKh3Frorh6kapoz0kAAAAAAAAAAAAAAAAAAAAAcPMfN7hWbd4babsAAAAASUVORK5CYII=) no-repeat 50%;
}
</style>
