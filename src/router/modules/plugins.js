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
    { path: 'chart/echartZxt', name: 'demo-plugins-chart-echartZxt', component: _import('demo/plugins/chart/echartZxt'), meta: { ...meta, title: '折线图' } },
    { path: 'chart/echartBt', name: 'demo-plugins-chart-echartBt', component: _import('demo/plugins/chart/echartBt'), meta: { ...meta, title: '饼图' } },
    { path: 'chart/echartZzt', name: 'demo-plugins-chart-echartZzt', component: _import('demo/plugins/chart/echartZzt'), meta: { ...meta, title: '柱状图' } },
  ]
}
