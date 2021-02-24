// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

import $ from 'jquery'
import  echarts from 'echarts'
import VCharts from 'v-charts'
import XEUtils from 'xe-utils'
import '@/plugin/vxe-table'


XEUtils.setup({
  formatDate: 'yyyy-MM-dd HH:mm:ss', // 默认的 toStringDate 参数
  formatString: 'yyyy-MM-dd HH:mm:ss', // 默认的 toDateString 参数
  formatStringMatchs : {
    E: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    q: [null, '第一季度', '第二季度', '第三季度', '第四季度']
  }
})

Vue.prototype.$XEUtils = XEUtils
Vue.prototype.$echarts = echarts
Vue.prototype.$ = $

// 核心插件

Vue.use(d2Admin)
Vue.use(VCharts)



new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if (matched.length > 0) {
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }
      },
      immediate: true
    }
  }
}).$mount('#app')
