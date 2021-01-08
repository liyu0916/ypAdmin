import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/plugins',
  name: 'demo-plugins',
  meta,
  redirect: { name: 'demo-plugins-index' },
  component: layoutHeaderAside,
  children: [
    { path: 'clipboard-polyfill', name: 'demo-plugins-clipboard-polyfill', component: _import('demo/plugins/clipboard-polyfill'), meta: { ...meta, title: '剪贴板访问' } },
    { path: 'day', name: 'demo-plugins-day', component: _import('demo/plugins/day'), meta: { ...meta, title: '日期计算' } },
    { path: 'export/table', name: 'demo-plugins-export-table', component: _import('demo/plugins/export/table.vue'), meta: { ...meta, title: '导出表格' } },
    { path: 'export/txt', name: 'demo-plugins-export-txt', component: _import('demo/plugins/export/txt.vue'), meta: { ...meta, title: '导出文本' } },
    { path: 'import/csv', name: 'demo-plugins-import-csv', component: _import('demo/plugins/import/csv.vue'), meta: { ...meta, title: '导入 csv' } },
    { path: 'import/xlsx', name: 'demo-plugins-import-xlsx', component: _import('demo/plugins/import/xlsx.vue'), meta: { ...meta, title: '导入 xlsx' } },
    { path: 'index', name: 'demo-plugins-index', component: _import('demo/plugins/index'), meta: { ...meta, title: '插件首页' } },
    { path: 'js-cookie', name: 'demo-plugins-js-cookie', component: _import('demo/plugins/js-cookie'), meta: { ...meta, title: 'Cookie' } },
    { path: 'vxe-table/typical', name: 'demo-plugins-vxe-table-typical', component: _import('demo/plugins/vxe-table/typical'), meta: { ...meta, title: '典型crud', cache: true } },
    { path: 'vxe-table/grid', name: 'demo-plugins-vxe-table-grid', component: _import('demo/plugins/vxe-table/grid'), meta: { ...meta, title: 'grid', cache: true } },
    { path: 'vxe-table/chart', name: 'demo-plugins-vxe-table-chart', component: _import('demo/plugins/vxe-table/chart'), meta: { ...meta, title: 'chart' } },
    { path: 'vxe-table/rowedit', name: 'demo-plugins-vxe-table-rowedit', component: _import('demo/plugins/vxe-table/rowedit'), meta: { ...meta, title: 'rowedit' } },
    { path: 'vxe-table/tree', name: 'demo-plugins-vxe-table-tree', component: _import('demo/plugins/vxe-table/tree'), meta: { ...meta, title: 'tree' } },
    { path: 'v-charts/vchartZxt', name: 'demo-plugins-v-charts-vchartZxt', component: _import('demo/plugins/v-charts/vchartZxt'), meta: { ...meta, title: 'v-charts折线图' } },
    { path: 'v-charts/vchartBt', name: 'demo-plugins-v-charts-vchartBt', component: _import('demo/plugins/v-charts/vchartBt'), meta: { ...meta, title: 'v-charts饼图' } },
    { path: 'v-charts/vchartZzt', name: 'demo-plugins-v-charts-vchartZzt', component: _import('demo/plugins/v-charts/vchartZzt'), meta: { ...meta, title: 'v-charts柱状图' } },
    { path: 'v-charts/vchartLdt', name: 'demo-plugins-v-charts-vchartLdt', component: _import('demo/plugins/v-charts/vchartLdt'), meta: { ...meta, title: 'v-charts漏斗图' } },
    { path: 'echarts/echartsZxt', name: 'demo-plugins-echarts-echartsZxt', component: _import('demo/plugins/echarts/echartsZxt'), meta: { ...meta, title: 'echarts折线图' } },
    { path: 'echarts/echartsZzt', name: 'demo-plugins-echarts-echartsZzt', component: _import('demo/plugins/echarts/echartsZzt'), meta: { ...meta, title: 'echarts柱状图' } },
    { path: 'echarts/echartsBt', name: 'demo-plugins-echarts-echartsBt', component: _import('demo/plugins/echarts/echartsBt'), meta: { ...meta, title: 'echarts饼图' } }
    ]
}
