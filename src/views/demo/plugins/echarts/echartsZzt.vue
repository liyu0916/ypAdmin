<template>
  <d2-container>
    <el-row :gutter="20" class="d2-mt">
      <el-col :span="12">
        <el-card>
          <div ref="chart1" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="height: 300px" ref="chart2"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="d2-mt">
      <el-col :span="12">
        <el-card>
          <div ref="chart3" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="height: 300px" ref="chart4"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="d2-mt">
      <el-col :span="12">
        <el-card>
          <div ref="chart5" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="height: 300px" ref="chart6"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" slot="footer">
      可参考echarts配置项文档: <d2-link-btn  link="https://echarts.apache.org/zh/option.html#title.right"/>
    </el-row>
  </d2-container>
</template>
<script>
   import echarts from 'echarts'
    export default {
        name: "echarts-zzt",
        methods:{
          drawZzt1(){
            let chart1 = this.$refs.chart1;
            if(chart1){
              let myChart = this.$echarts.init(chart1)
              let option = {
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                  type: 'value'
                },
                series: [{
                  data: [120, 200, 150, 80, 70, 110, 130],
                  type: 'bar'
                }]
              };
              myChart.setOption(option);
            }else{
              console.log("v-charts 为空")
            }
          },
          drawZzt2(){
            let chart2 = this.$refs.chart2;
            if(chart2){
              let myChart = this.$echarts.init(chart2)
              let option = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                series: [
                  {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true,
                      position: 'insideRight'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                  },
                  {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true,
                      position: 'insideRight'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true,
                      position: 'insideRight'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true,
                      position: 'insideRight'
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                  },
                  {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true,
                      position: 'insideRight'
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                  }
                ]
              };
              myChart.setOption(option);
            }else{
              console.log("v-charts 为空")
            }
          },
          drawZzt3(){
            let chart3 = this.$refs.chart3;
            if(chart3){
              let myChart = this.$echarts.init(chart3)
              let option = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  data: ['利润', '支出', '收入']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'value'
                  }
                ],
                yAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      show: false
                    },
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                  }
                ],
                series: [
                  {
                    name: '利润',
                    type: 'bar',
                    label: {
                      show: true,
                      position: 'inside'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                  },
                  {
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                  },
                  {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    label: {
                      show: true,
                      position: 'left'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                  }
                ]
              };
              myChart.setOption(option);
            }else{
              console.log("v-charts 为空")
            }
          },
          drawZzt4(){
            let chart4 = this.$refs.chart4;
            if(chart4){
              let myChart = this.$echarts.init(chart4)
              let option = {
                legend: {},
                tooltip: {},
                dataset: {
                  source: [
                    ['product', '2015', '2016', '2017'],
                    ['Matcha Latte', 43.3, 85.8, 93.7],
                    ['Milk Tea', 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 72.4, 53.9, 39.1]
                  ]
                },
                xAxis: {type: 'category'},
                yAxis: {},
                series: [
                  {type: 'bar'},
                  {type: 'bar'},
                  {type: 'bar'}
                ]
              };
              myChart.setOption(option);
            }else{
              console.log("v-charts 为空")
            }
          },
        },
      mounted(){
        this.drawZzt1();
        this.drawZzt2();
        this.drawZzt3();
        this.drawZzt4()
      }
    }
</script>

<style scoped>

</style>
