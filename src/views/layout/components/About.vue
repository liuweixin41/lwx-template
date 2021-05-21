<template>
  <div>
    <span @click="dialogVisible = true">版本信息</span>

    <div class="about">
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true" title="关于" width="30%">
        <el-row>
          <el-col :span="20">
            <div class="left-top">全国信用信息第三方数据共享系统</div>
            <div>
              <div class="left-bottom">
                <span>软件版本: </span><span>V1.0.5.3</span>
              </div>
              <div class="left-bottom">
                <span>版本日期: </span><span>2021-03-05</span>
              </div>
              <div class="left-bottom">
                <span>技术支持: </span><span>北京国信杰云科技有限公司</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <!-- <img src="@/assets/img/guohui-title.png" class="logo"> -->
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'About',
  components: {
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.logo{
  width: 100px;
}
.left-top{
  height: 50px;
  font-size: 18px;
  font-weight: bold;
}
.left-bottom{
  margin-top:3px;
  font-size: 14px;
  margin-bottom: 22px
}
</style>

