export default {
  path: '/demo/plugins',
  title: '插件',
  icon: 'plug',
  children: [
    { path: '/demo/plugins/index', title: '插件', icon: 'home' },
    {
      path: '/demo/plugins/import',
      title: '导入',
      icon: 'download',
      children: [
        { path: '/demo/plugins/import/csv', title: 'csv' },
        { path: '/demo/plugins/import/xlsx', title: 'xlsx' }
      ]
    },
    {
      path: '/demo/plugins/export',
      title: '导出',
      icon: 'upload',
      children: [
        { path: '/demo/plugins/export/table', title: '表格' },
        { path: '/demo/plugins/export/txt', title: '文本' }
      ]
    },
    { path: '/demo/plugins/clipboard-polyfill', title: '剪贴板访问', icon: 'clipboard' },
    { path: '/demo/plugins/day', title: '日期计算', icon: 'clock-o' },
    { path: '/demo/plugins/js-cookie', title: 'Cookie 读写', icon: 'asterisk' },
    {
      path: '/demo/plugins/vxe-table',
      title: 'vxe-table',
      icon: 'table',
      children: [
        { path: '/demo/plugins/vxe-table/typical', title: '典型crud' },
        { path: '/demo/plugins/vxe-table/grid', title: 'grid' },
        { path: '/demo/plugins/vxe-table/chart', title: 'chart' },
        { path: '/demo/plugins/vxe-table/rowedit', title: 'rowedit' },
        { path: '/demo/plugins/vxe-table/tree', title: 'tree' }
      ]
    },
    //v-charts
    {
      path: '/demo/plugins/v-charts',
      title: 'v-charts',
      icon: 'pie-chart',
      children: [
        { path: '/demo/plugins/v-charts/vchartZxt', title: 'v-charts折线图' },
        { path: '/demo/plugins/v-charts/vchartBt', title: 'v-charts饼图' },
        { path: '/demo/plugins/v-charts/vchartZzt', title: 'v-charts柱状图' },
        { path: '/demo/plugins/v-charts/vchartLdt', title: 'v-charts漏斗图' },
      ]
    },
    //echarts
    {
      path: '/demo/plugins/echarts',
      title: 'echarts',
      icon: 'area-chart',
      children: [
        { path: '/demo/plugins/echarts/echartsZxt', title: 'echarts折线图' },
        { path: '/demo/plugins/echarts/echartsBt', title: 'echarts饼图' },
        { path: '/demo/plugins/echarts/echartsZzt', title: 'echarts柱状图' },
      ]
    },
    //highcharts
    {
      path: '/demo/plugins/highCharts',
      title: 'highCharts',
      icon: 'line-chart',
      children: [
        { path: '/demo/plugins/highCharts/highChartsBt', title: 'highCharts饼图' },
      ]
    },
    //视频播放
    {
      path: '/demo/plugins/videoPlayer',
      title: 'videoPlayer',
      icon: 'video-camera',
      children: [
        { path: '/demo/plugins/videoPlayer/movie', title: 'video视频播放' },
      ]
    },
    //轮播
    {
      path: '/demo/plugins/swiper',
      title: 'swiper',
      icon: 'crosshairs',
      children: [
        { path: '/demo/plugins/swiper/swipers', title: 'swiper轮播' },
      ]
    },
  ]
}
