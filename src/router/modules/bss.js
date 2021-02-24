import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true, cache: true }

export default {
  path: '/system',
  name: 'system',
  meta,
  redirect: { name: 'system-index' },
  component: layoutHeaderAside,
  children: [
    { path: 'index', name: 'system-index', component: _import('system/index'), meta: { ...meta, title: '支撑首页' } },
    { path: 'tool/gen', name: 'system-tool-gen', component: _import('system/tool/gen'), meta: { ...meta, title: '代码生成' } },
    { path: 'tool/gen/edit/:tableId(\\d+)', name: 'system-tool-gen-edit', component: _import('system/tool/gen/editTable'), meta: { ...meta, title: '修改生成配置' } }
  ]
}
