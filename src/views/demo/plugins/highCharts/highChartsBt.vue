<template>
  <d2-container>
    <el-row :gutter="20" class="d2-mt">
      <el-col :span="12">
        <el-card>
          <highcharts :options="chartOptions"></highcharts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <highcharts :options="chartOptions1"></highcharts>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" slot="footer">
      <d2-link-btn title="依赖" link="https://www.highcharts.com.cn/docs"/>
    </el-row>
  </d2-container>
</template>

<script>
  import Vue from 'vue'
  import Highchart from "highcharts/highcharts"
  import HighchartsVue from "highcharts-vue"
  import stockInit from "highcharts/modules/stock"
  import highcharts3d from 'highcharts/highcharts-3d'
  stockInit(Highchart);
  Vue.use(HighchartsVue);
  highcharts3d(Highchart);
    export default {
      name: "high-charts-bt",
      data(){
        return{
          chartOptions:{
            chart: {
              type: 'pie',
              margin: [0, 0, 0, 0],
              options3d: {
                enabled: true,
                alpha: 65
              },
              backgroundColor: "rgba(0,0,0,0)"
            }
        },
          chartOptions1:{
            chart: {
              type: 'column',
              margin: [0, 0, 0, 0],
            }
          }
      }
      },
      methods:{
        drawHighChartBt(){
          this.chartOptions = {
            chart: {
              type: 'pie',
              margin: [65, 0, 0, 20],
              options3d: {
                enabled: true,
                alpha: 65
              },
              backgroundColor: "rgba(0,0,0,0)",
            },
            title: {
              text: 'null',
              style: {
                fontSize: 10,
                color: "rgba(0,0,0,0)"
              }
            },
            credits: {
              enabled: false
            },
            tooltip: {
              shared: true,
              backgroundColor:'rgba(12,33,44,0.7)',
              borderColor:'rgba(149,244,255,0.3)',
              style:{
                color:"#00cce2",
              },
            },
            colors: ["#e5dd33", "#4DE55E", "#ff871c", "#d93cdf"],//, "#285ed8"
            legend: {
              align: 'left',
              verticalAlign: 'center',
              // width:600,
              // itemWidth:110,
              y:0,
              itemStyle:{
                color:"#00cce2"
              },
              itemHoverStyle:{
                color:"#00cce2"
              }
            },
            plotOptions: {
              pie: {
                innerSize: 40,
                depth: 30,
                showInLegend: true,
                dataLabels: {
                  // enabled:false,
                  distance: 6,//设置折线的长短
                  useHTML: true,
                  formatter:function(){
                    return "<b>"+this.point.name+"</b> "+this.point.y+"";
                    //return "<p style='width: 60px;fontSize: 10;text-align: center; white-space:pre-wrap;word-break: keep-all;'><b>"+this.point.name+"</b> "+this.point.y+"</p>";
                    // if(this.point.y>0)
                    // {
                    //   return '<b>'+this.point.name+'</b>:'+this.point.y;
                    // }
                  },
                  // format: '<b>{point.name}</b>:{point.y}',//显示内容样式的设置
                  style: {
                    color: "#00cce2",
                    textOutline: "none"
                  }
                }
              }
            },
            series: [{
              name:"预/告警数量",
              data:[
                ['山火告警',0],
                ['图像告警',3572],
                ['气象预警',136],
                ['智能感知预警',56]
              ]
            }]
          }
        },
        drawHighZzt(){
          this.chartOptions1= {
            chart: {
              type: 'column',
              margin: 45,
              options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70,
                viewDistance: 30,      // 视图距离，它对于计算角度影响在柱图和散列图非常重要。此值不能用于3D的饼图
                frame: {                // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
                  // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
                  // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
                  bottom: {
                    size: 10
                  },
                  side: {
                    size: 1,
                    color: 'transparent'
                  },
                  back: {
                    size: 1,
                    color: 'transparent'
                  }
                }
              },
            },
            title: {
              text: '3D柱状图'
            },
            credits: {
              enabled: false//不显示LOGO
            },
            plotOptions: {
              column: {
                depth: 25
              }
            },
            xAxis: {},
            yAxis: {
              title: {
                text: null
              }
            },
            series: [{
              name: '销售',
              data: [2, 3, 4, 4, 0, 5, 1, 4, 6, 3]
            }]
          }
        }
      },
      mounted(){
        this.drawHighChartBt();
        this.drawHighZzt()
      }
  }
</script>

<style scoped>

</style>
