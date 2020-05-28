import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import './styles/element-variables.scss'
import './icons' // icon

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'

Vue.use(ElementUI)

Vue.config.productionTip = false
let app = null

function VueRender (appContent, loading) {
  return new Vue({
    el: '#container',
    router,
    store,
    data () {
      return {
        content: appContent,
        loading
      }
    },
    render (h) {
      return h(App, {
        props: {
          content: this.content,
          loading: this.loading
        }
      })
    }
  })
}

function render ({ appContent, loading } = {}) {
  if (!app) {
    app = VueRender(appContent, loading)
  } else {
    app.content = appContent
    app.loading = loading
  }
}

function genActiveRule (routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}

/**
 * Step1 初始化应用（可选）
 */
render({ appContent: '', loading: true })

/**
 * Step2 注册子应用
 */
registerMicroApps(
  [
    {
      name: '聚优街',
      entry: 'http://localhost:80/shopadmin',
      render,
      activeRule: genActiveRule('http://localhost:80/shopadmin/' + name)
    }
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
      }
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      }
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      }
    ]
  }
)

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/app1')
/**
 * Step4 启动应用
 */
start({
  prefetch: true,
  jsSandbox: true,
  singular: true,
  fetch: window.fetch
})

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})