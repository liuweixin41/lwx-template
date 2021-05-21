<template>
  <div class="pdf">
    <div class="pdf-tab">
      <div
        v-for="(item,index) in pdfList"
        :key="index"
        :class="['btn-def',{'btn-active':activeIndex==index}]"
        @click.stop="pdfClick(item.pdfUrl,index)">
        {{ item.title }}
      </div>
    </div>
    <el-input v-model="loadPdfurl" placeholder="pdfUrl"/>
    <el-button type="primary" @click="loadPdfUrl">加载PDF</el-button>
    <pdf
      v-for="i in numPages"
      :key="i"
      :src="pdfUrl"
      :page="i"
      style="display: inline-block; width: 100%"/>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdfall',
  components: {
    pdf
  },
  data() {
    return {
      pdfList: [
        {
          // pdfUrl: 'http://' + window.location.host + '/file/xyzg.pdf',
          pdfUrl: 'http://file.gp58.com/file/2018-11-14/111405.pdf',
          title: '你好，2019年'
        },
        {
          pdfUrl: 'http://file.gp58.com/file/2018-11-14/111405.pdf',
          title: '中信证券观点'
        },
        {
          pdfUrl: 'https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf',
          title: '12月投资月刊'
        },
        {
          pdfUrl: 'https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003282521.pdf',
          title: '丰岭资本观点'
        }
      ],
      pdfUrl: '',
      loadPdfurl: '',
      numPages: 1,
      activeIndex: 0
    }
  },
  mounted: function() {
    this.pdfTask(this.pdfList[0].pdfUrl)
  },
  methods: {
    pdfTask(pdfUrl) {
      var self = this
      var loadingTask = pdf.createLoadingTask(pdfUrl)
      console.log('pdfUrl', pdfUrl)
      console.log('loadingTask1', loadingTask)
      loadingTask.then(pdf => {
        self.pdfUrl = loadingTask
        console.log('loadingTask', loadingTask)
        self.numPages = pdf.numPages
      }).catch(() => {
        console.error('pdf加载失败')
      })
    },
    pdfClick(pdfUrl, index) {
      if (index === this.activeIndex) return
      this.activeIndex = index
      this.pdfUrl = null
      this.pdfTask(pdfUrl)
    },
    loadPdfUrl() {
      this.pdfTask(this.loadPdfurl)
    }
  }
}
</script>
