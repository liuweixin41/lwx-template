<template>
  <div class="pdf">
    <el-button type="primary" size="mini" @click="prePage">上一页</el-button>
    <el-button type="primary" size="mini" @click="nextPage">下一页</el-button>
    <el-button type="primary" size="mini" @click="zoombig">放大</el-button>
    <el-button type="primary" size="mini" @click="zoomsmall">缩小</el-button>
    <el-button type="primary" size="mini" @click="clock">顺时针</el-button>
    <el-button type="primary" size="mini" @click="counterClock">逆时针</el-button>
    <el-button type="primary" size="mini" @click="pdfPrintAll">全部打印</el-button>
    <el-button type="primary" size="mini" @click="pdfPrint">部分打印</el-button>
    <!-- <div class="pdf-tab">
      <div
        class="btn-def btn-pre"
        @click.stop="prePage">上一页</div>
      <div
        class="btn-def btn-next"
        @click.stop="nextPage">下一页</div>
      <div
        class="btn-def"
        @click.stop="clock">顺时针</div>
      <div
        class="btn-def"
        @click.stop="counterClock">逆时针</div>
      <div
        class="btn-def"
        @click.stop="pdfPrintAll">全部打印</div>
      <div
        class="btn-def"
        @click.stop="pdfPrint">部分打印</div>
    </div> -->
    <span class="item">{{ pageNum }}/{{ pageTotalNum }}</span>
    <span class="item">进度：{{ loadedRatio }}</span>
    <span class="item">页面加载成功: {{ curPageNum }}</span>
    <div class="pdf-container">
      <div :style="leftStyleObject"/>
      <pdf
        ref="pdf"
        :src="pdfUrl"
        :page="pageNum"
        :rotate="pageRotate"
        :style="styleObject"
        class="pdf-wrap"
        @password="password"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @loaded="loadPdfHandler"
        @num-pages="pageTotalNum=$event"
        @error="pdfError($event)"
        @link-clicked="page = $event"/>
    </div>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components: {
    pdf
  },
  data() {
    return {
      pdfUrl: 'http://192.168.0.135/fileremote/xyzg.pdf',
      // pdfUrl: 'http://' + window.location.host + '/file/xyzg.pdf',
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      // 放大缩小
      width: 80
    }
  },
  computed: {
    styleObject() {
      return {
        display: 'inline-block',
        width: this.width + '%'
      }
    },
    leftStyleObject() {
      return {
        display: 'inline-block',
        width: (100 - this.width) / 2 + '%'
      }
    }
  },
  created() {
    // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
    console.log('url-created', this.pdfUrl)
    this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)
  },
  mounted() {
    this.logTest()
  },
  methods: {
    prePage() {
      var p = this.pageNum
      p = p > 1 ? p - 1 : this.pageTotalNum
      this.pageNum = p
    },
    nextPage() {
      var p = this.pageNum
      p = p < this.pageTotalNum ? p + 1 : 1
      this.pageNum = p
    },
    clock() {
      this.pageRotate += 90
    },
    counterClock() {
      this.pageRotate -= 90
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e) {
      this.curPageNum = e
    },
    pdfError(error) {
      console.error(error)
    },
    pdfPrintAll() {
      this.$refs.pdf.print()
    },
    pdfPrint() {
      this.$refs.pdf.print(100, [1, 2]) // 100是打印dpi, [1,2]是需要打印的页数
    },
    logTest() {
      console.log('leftStyleObject', this.leftStyleObject)
      console.log('styleObject', this.styleObject)
    },
    loadPdfHandler() {

    },
    zoombig() {
      this.width += 10
    },
    zoomsmall() {
      this.width -= 10
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display:inline-block;
  margin: 0 5px;
}
.pdf-container {
  background-color: #404040;
}
.pdf-wrap {
  // -webkit-box-shadow: 0 1px 6px 0 rgba(13, 13, 13, 0.32), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  // box-shadow: 0 1px 6px 0 rgba(13, 13, 13, 0.32), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border: 9px solid transparent;
  border-image: url('../../assets/img/shadow.png') 9 9 repeat;
  background-clip: content-box;
  background-color: white;
}
</style>

