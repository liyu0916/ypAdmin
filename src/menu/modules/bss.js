export default {
  path: '/system',
  title: '业务支撑',
  icon: 'resistance',
  children: [
    { path: '/system/index', title: '业务支撑', icon: 'home' },
    {
      path: '/system/admin',
      title: '系统管理',
      icon: 'windows',
      children: [
        { path: '/system/admin/user', title: '用户管理' }
      ]
    },
    {
      path: '/system/monitor',
      title: '系统监控',
      icon: 'id-card',
      children: [
        { path: '/system/monitor/online', title: '在线用户' }
      ]
    },
    {
      path: '/system/tool',
      title: '系统工具',
      icon: 'wrench',
      children: [
        { path: '/system/tool/gen', title: '代码生成' }
      ]
    }
  ]
}
