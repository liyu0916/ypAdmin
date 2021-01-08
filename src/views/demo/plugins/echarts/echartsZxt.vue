<template>
  <d2-container>
    <el-row :gutter="20" class="d1-mt">
      <el-col :span="12">
        <el-card>
         <div ref="chart" style="height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div style="height: 400px" ref="chart1"></div>
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

    import HighCharts from 'highcharts'
    export default {
        name: "echarts-zxt",
        methods:{
          drawZxt1(){
          let chart = this.$refs.chart;
          if(chart){
            let myChart = this.$echarts.init(chart)
            let option = {
              title:{
                text:"Basic Line Chart"
              },
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line'
                }, {
                  data: [20, 93, 91, 34, 290, 133, 320],
                  type: 'line'
                }
              ]
            };
            myChart.setOption(option);
            // setTimeout(() => {
            //   myChart.resize();
            // }, 1000);
          }else{
            console.log("v-charts 为空")
          }
        },
          drawZxt2(){
            let chart1 = this.$refs.chart1;
            if(chart1){
              let myChart = this.$echarts.init(chart1)
              let option = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#6a7985'
                    }
                  }
                },
                legend: {
                  data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                  }
                ],
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                series: [
                  {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                  },
                  {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [320, 332, 301, 334, 390, 330, 320]
                  },
                  {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                      normal: {
                        show: true,
                        position: 'top'
                      }
                    },
                    areaStyle: {},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                  }
                ]
              };
              myChart.setOption(option);
            }
          }
        },
        mounted(){
          this.$nextTick(()=>{
            this.drawZxt1();
            this.drawZxt2();
          })
        },
        created(){
          this.$nextTick(()=>{

          })
        }
    }
</script>

<style scoped>

</style>
