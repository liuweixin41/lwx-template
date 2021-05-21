<template>
  <el-button v-bind="$attrs" :disabled="disabled" v-on="evet"><slot/></el-button>
</template>
<script>
export default {
  name: 'ThroatBtn',
  data() {
    return {
      timer: null
    }
  },
  computed: {
    evet() {
    // $listeners：子组件里面，获取父组件对子组件 v-on 的所有监听事件
      if (this.$listeners.click) {
        // eslint-disable-next-line
        this.$listeners.click = this.throat('click')
      }
      return this.$listeners
    },
    disabled() {
      if (this.timer) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    throat(method) {
      const me = this
      return (...args) => {
        if (!me.timer) {
          me.$emit(method, ...args)
          me.timer = setTimeout(() => {
            me.timer = null
          }, me.$attrs.throat || 5000) // 默认5s的，节流
        } else {
          me.$emit('droped', ...args) // 点击太频繁的事件提示
        }
      }
    }
  }
}
</script>
