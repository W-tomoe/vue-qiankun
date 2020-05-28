<template>
  <div id="main-container">
    <Navbar></Navbar>
    <!-- 子应用盒子 -->
    <div id="root-view" class="app-view-box" v-html="content"/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import { Loading } from 'element-ui'

export default {
  name: 'App',
  props: {
    loading: Boolean,
    content: String
  },
  components: {
    Navbar
  },
  beforeCreate () {
    const loadingInstance = Loading.service({ fullscreen: true })
    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close()
    })
  }
}
</script>