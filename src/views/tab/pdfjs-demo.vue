<template>
  <div>
    <button @click="scalBig">放大</button>
    <button @click="scalSmall">缩小</button>
    <p>页码：{{ `${pageNo}/${totals.length}` }}</p>
    <div id="dragBox" class="drag-box" @scroll="scrollfun($event)">
      <el-scrollbar style="height: 100%;overflow-y: hidden;">
        <div id="pdf-container" class="wrapper">
          <div v-for="item in totals" :id="`page-${item}`" :key="item" class="pdf-box">
            <canvas :id="'canvas-pdf-' + item" class="canvas-pdf"/>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
export default {
  name: 'ShowPdf',
  // props: ['pdfUrl'],
  data() {
    return {
      scale: 1.4,
      totals: [],
      pageNo: 1,
      viewHeight: 0,
      pdfUrl: 'http://file.gp58.com/file/2018-11-14/111405.pdf'
    }
  },
  watch: {
    scale(val) {
      this.totals = []
      this.renderPdf(val)
    }
  },
  mounted() {
    this.renderPdf(this.scale)
  },
  methods: {
    renderPdf(scale) {
      PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
      PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
      // 当 PDF 地址为跨域时，pdf 应该已流的形式传输，否则会出现pdf损坏无法展示
      PDFJS.getDocument(this.pdfUrl).then(pdf => {
        // 得到PDF的总的页数
        const totalPage = pdf.numPages
        const idName = 'canvas-pdf-'
        // 根据总的页数创建相同数量的canvas
        this.createCanvas(totalPage, idName)
        for (let i = 1; i <= totalPage; i++) {
          pdf.getPage(i).then((page) => {
            const pageDiv = document.getElementById(`page-${i}`)
            const viewport = page.getViewport(scale)
            const canvas = document.getElementById(idName + i)
            const context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width
            this.viewHeight = viewport.height
            const renderContext = {
              canvasContext: context,
              viewport
            }
            // 如果你只是展示pdf而不需要复制pdf内容功能，则可以这样写render
            // page.render(renderContext) 如果你需要复制则像下面那样写利用text-layer
            page.render(renderContext).then(() => {
              return page.getTextContent()
            }).then((textContent) => {
              // 创建文本图层div
              const textLayerDiv = document.createElement('div')
              textLayerDiv.setAttribute('class', 'textLayer')
              // 将文本图层div添加至每页pdf的div中
              pageDiv.appendChild(textLayerDiv)
              // 创建新的TextLayerBuilder实例
              const textLayer = new TextLayerBuilder({
                textLayerDiv: textLayerDiv,
                pageIndex: page.pageIndex,
                viewport: viewport
              })
              textLayer.setTextContent(textContent)
              textLayer.render()
            })
          })
        }
      })
    },
    createCanvas(totalPages) {
      for (let i = 1; i <= totalPages; i++) {
        this.totals.push(i)
      }
    },
    // 分页
    scrollfun(e) {
      const scrollTop = e.target.scrollTop
      if (scrollTop === 0) {
        this.pageNo = 1
      } else {
        this.pageNo = Math.ceil(scrollTop / this.viewHeight)
      }
    },
    // 放大
    scalBig() {
      this.scale = this.scale + 0.1
    },
    // 缩小
    scalSmall() {
      if (this.scale > 1.2) {
        this.scale = this.scale - 0.1
      }
    }
  }
}
</script>

<style scoped lang="scss">
 .drag-box {
  height: 800px;
 }
 .pdf-box {
  position: relative;
 }
 .el-scrollbar__wrap {
  overflow-x: hidden;
 }
</style>
