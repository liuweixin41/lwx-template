<!--  -->
<template>
  <div class="wrapper-container">
    <!-- overflow: hidden：清除子元素相对父元素的超界溢出 -->
    <div :style="{height : showMore ? 'auto': showHeight + 'px'}" style="overflow: hidden">
      <div ref="content">
        <slot>
          <!-- 当外界 <show-more> 标签中有元素时，使用 <show-more> 标签中的元素进行渲染，否则使用下面这个 div 进行渲染 -->
          <div v-html="content"/>
        </slot>
      </div>
    </div>

    <div v-show="isLongContent" :class="{'show-more' : showMore}" class="control">
      <el-button type="text" @click="_toggleShowMore">{{ showMore ? '收起' : '显示更多' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHeight: {
      type: Number,
      required: true,
      default: 200
    },
    content: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showMore: false,
      isLongContent: false
    }
  },
  watch: {
    // 每当内容变化时都重新计算一次高度
    content() {
      this._calculateHeight()
    }
  },
  created() {
    this._calculateHeight()
  },
  methods: {
    refresh() {
      this._calculateHeight()
    },
    _calculateHeight() {
      // $nextTick()，等待内容获取完毕再计算高度，异步处理
      this.$nextTick().then(() => {
        const contentHeight = this.$refs.content.clientHeight
        console.log('showHeight', this.showHeight)
        if (contentHeight > this.showHeight) {
          this.isLongContent = true
        } else {
          this.isLongContent = false
        }
      })
    },
    _toggleShowMore() {
      this.showMore = !this.showMore
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper-container {
    position: relative;
    padding-bottom: 30px;

    .control {
        // [滑稽]这里的代码是从 CSDN 那复制过来的，毕竟人家的渐变遮罩层写好了我就不重复发明轮子了
        position: absolute;
        right: 10px;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);

        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
}
</style>
