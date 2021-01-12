<template>
  <d2-container>
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
          drawZzt2() {
            let chart2 = this.$refs.chart2;
            if(chart2){
              let myChart = this.$echarts.init(chart2);
              //柱状堆叠图
              let option =  {
                grid:{
                  top:50,
                  bottom:46,
                  left:45,
                  right:5
                },
                tooltip:{
                  show:true,
                  trigger:"axis",
                  textStyle:{
                    color:"#00cce2"
                  },
                  axisPointer:{
                    type:"shadow"
                  },
                },
                legend: {
                  show:true,
                  icon:"circle",
                  textStyle:{
                    color:"#00cce2",
                    //fontSize:10,
                  },
                  data:['危急','严重','一般'],
                  right:20,
                  width:250
                },
                xAxis: {
                  type: 'category',
                  data:['杆塔','基础','导地线','金具','通道环境','接地电阻','原因不明'],
                  axisLine:{
                    show:true,
                    lineStyle: {
                      color: "#00cce2"
                    },
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel:{
                    show:true,
                    rotate:50,
                    fontSize:10,
                    interval:0
                  },
                  splitLine:{
                    show:false
                  },
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: "#00cce2"
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: true
                  },
                  splitLine: {
                    show:true,
                    lineStyle:{
                      color:"rgba(59,123,123,.3)"
                    }
                  }
                },
                series : [
                  {
                    name:'危急',
                    type:'bar',
                    barWidth:15,
                    stack:"缺陷统计",
                    itemStyle:{
                      barBorderRadius:3,
                      borderColor:"rgba(2,65,64,.8)",
                      borderWidth:1,
                      color:{
                        type: 'linear',
                        x: 0, x2: 1, y: 0, y2: 0,
                        colorStops: [{
                          offset: 0,
                          color: 'rgba(242,73,77)'
                        }, {
                          offset: 0.5,
                          color: 'rgba(242,73,77)'
                        }, {
                          offset: 0.5,
                          color:'rgba(199,34,38)'
                        }, {
                          offset: 1,
                          color:'rgba(199,34,38)'
                        }]
                      },
                    },
                    data:[4,0,0,0,1,0,0]
                  },
                  {
                    name:'严重',
                    type:'bar',
                    barWidth:15,
                    stack:"缺陷统计",
                    itemStyle:{
                      barBorderRadius:3,
                      borderColor:"rgba(2,65,64,.8)",
                      borderWidth:1,
                      color:{
                        type: 'linear',
                        x: 0, x2: 1, y: 0, y2: 0,
                        colorStops: [{
                          offset: 0,
                          color: 'rgba(255,135,28)'
                        }, {
                          offset: 0.5,
                          color: 'rgba(255,135,28)'
                        }, {
                          offset: 0.5,
                          color: 'rgba(223,108,31)'
                        }, {
                          offset: 1,
                          color: 'rgba(223,108,31)'
                        }]
                      },
                    },
                    data:[2,0,0,0,3,0,0]
                  },
                  {
                    name:'一般',
                    type:'bar',
                    barWidth:15,
                    stack:"缺陷统计",
                    itemStyle:{
                      barBorderRadius:3,
                      borderColor:"rgba(2,65,64,.8)",
                      borderWidth:1,
                      color:{
                        type: 'linear',
                        x: 0, x2: 1, y: 0, y2: 0,
                        colorStops: [{
                          offset: 0,
                          color: 'rgba(244,235,33)'
                        }, {
                          offset: 0.5,
                          color: 'rgba(244,235,33)'
                        }, {
                          offset: 0.5,
                          color: 'rgba(207,200,44)'
                        }, {
                          offset: 1,
                          color: 'rgba(207,200,44)'
                        }]
                      },
                    },
                    data:[0,0,0,0,0,1,1]
                  }
                ]
              }
              myChart.setOption(option)
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
          drawZzt5(){
            let chart5 = this.$refs.chart5;
            if(chart5){
              let myChart = this.$echarts.init(chart5)
              let colors = {
                type: 'linear',
                x: 0, x2: 1, y: 0, y2: 0,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(18,248,254,0.8)'
                }, {
                  offset: 0.5,
                  color: 'rgba(18,248,254,0.8)'
                }, {
                  offset: 0.5,
                  color:'rgba(62,153,255,0.8)'
                }, {
                  offset: 1,
                  color:'rgba(62,153,255,0.8)'
                }]
              }
              let barWidth = 16;
              let option = {
                grid:{
                  top:40,
                  right:20,
                  bottom:55,
                  left:50
                },
                tooltip:{
                  show:false,
                  trigger:"item",
                  textStyle:{
                    color:" #00cce2",
                  }
                },
                xAxis: {
                  data:['微气象','图像','杆塔倾斜','接地电阻','无线测温','智能金具'],
                  //控制x轴线颜色
                  axisLine:{
                    show:true,
                    lineStyle:{
                      color:"rgba(0,255,255,.4)"
                    }
                  },
                  //控制x轴刻度线
                  axisTick:{
                    show:false
                  },
                  //控制x轴字体样式
                  axisLabel:{
                    show:true,
                    interval:0,
                    rotate:60,
                    color:" #00cce2",
                    fontSize:10
                  },
                  //控制网格线是否显示
                  splitLine:{
                    show:false
                  }
                },
                yAxis: {
                  //控制y轴线颜色
                  axisLine:{
                    show:false
                  },
                  //控制y轴刻度线
                  axisTick:{
                    show:false
                  },
                  //控制y轴字体样式
                  axisLabel:{
                    show:true,
                    color:" #00cce2",
                    fontSize:10
                  },
                  //控制网格线是否显示
                  splitLine:{
                    show:true,
                    lineStyle:{
                      color:"rgba(59,123,123,.3)"
                    }
                  }
                },
                series: [
                  // 中间部分
                  {
                    z:1,
                    type: 'bar',
                    barWidth:barWidth,
                    data:[131,3965,3,28,2,93],
                    itemStyle:{
                      normal:{
                        color:colors
                      }
                    },
                    label:{
                      show:true,
                      position:"top",
                      color:" #00cce2"
                    },
                    barMinHeight:0
                  },
                  //底部
                  {
                    z:2,
                    type:'pictorialBar',
                    data :[0.1,0.1,0.1,0.1,0.1,0.1],
                    symbol :'diamond',
                    symbolOffset:[0,'50%'],
                    symbolSize:[barWidth,10],
                    itemStyle:{
                      normal:{
                        color:colors
                      }
                    },
                    label:{
                      show:false
                    }
                  },
                  //顶部
                  {
                    z:3,
                    type:'pictorialBar',
                    symbolPosition:'end',
                    data:[131,3965,3,28,2,93],
                    symbol :'diamond',
                    symbolOffset:[0,'-56%'],
                    symbolSize:[barWidth - 3,10 * (barWidth - 3) / barWidth],
                    itemStyle:{
                      normal:{
                        borderColor: 'rgba(18,248,254,.8)',
                        borderWidth: 2,
                        color:'rgba(62,153,255,.8)'
                      }
                    },
                    label:{
                      show:false
                    }
                  }]
              };
              myChart.setOption(option)
            }else{
              console.log('chart为空')
            }
          },
          drawZzt6(){
            let chart6 = this.$refs.chart6;
            if(chart6){
              let myChart = this.$echarts.init(chart6)
              let chartOptions={
                grid:{
                  left:40,
                  top:40,
                  bottom:50,
                  right:10
                },
                xAxis: {
                  data: ['1000kV', '±800kV', '500kV', '220kV', '110kV', '35kV'],
                  offset:6,
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: true,
                    lineStyle:{
                      color:"rgba(0,255,255,0.4)"
                    }
                  },
                  axisLabel: {
                    show: true,
                    interval:0,
                    textStyle: {
                      color: '#00cce2',
                      fontSize:10
                    }
                  },

                },
                yAxis: {
                  splitLine: {
                    show: true,
                    lineStyle:{
                      color:"rgba(59,123,123,0.3)"
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  axisLabel: {
                    show: true,
                    textStyle:{
                      color:" #00cce2"
                    }

                  }
                },
                series: [
                  {
                    type: 'pictorialBar',
                    symbolSize: [14, 5],
                    symbolOffset: [0, -3],
                    z: 10,
                    itemStyle: {
                      normal: {
                        color:"rgba(0,251,203,0.9)"
                      }
                    },
                    data: [{
                      value:4,
                      symbolPosition: 'end'
                    }, {
                      value:2,
                      symbolPosition: 'end'
                    }, {
                      value:130,
                      symbolPosition: 'end'
                    }, {
                      value:537,
                      symbolPosition: 'end'
                    }, {
                      value:917,
                      symbolPosition: 'end'
                    }, {
                      value:1111,
                      symbolPosition: 'end'
                    }
                    ]
                  },
                  {
                    type: 'pictorialBar',
                    symbolSize: [14, 5],
                    symbolOffset: [0, 3],
                    z: 12,
                    itemStyle: {
                      normal: {
                        color: 'rgba(0,251,203,0.9)'
                      }
                    },
                    data:[4,2,130,537,917,1111],
                    barMinHeight:[2]
                  },
                  {
                    type: 'pictorialBar',
                    symbolSize: [18, 4],
                    symbolOffset: [0,5],
                    z: 11,
                    itemStyle: {
                      normal: {
                        color: 'transparent',
                        borderColor: 'rgba(0,251,203,0.9)',
                        borderWidth: 2
                      }
                    },
                    data:[4,2,130,537,917,1111],
                    barMinHeight:[2]
                  },
                  {

                    type: 'pictorialBar',
                    symbolSize: [30,4],
                    symbolOffset: [0, 6],
                    z: 10,
                    itemStyle: {
                      normal: {
                        color: 'transparent',
                        borderColor: 'rgba(0,251,203,0.6)',
                        borderType: 'dashed',
                        borderWidth: 2
                      }
                    },
                    data:[4,2,130,537,917,1111],
                    barMinHeight:[2]
                  },
                  {
                    type: 'bar',
                    itemStyle: {
                      normal: {
                        color: 'rgba(0,251,203,0.6)',
                      }
                    },
                    silent: true,
                    barWidth: 14,
                    data:[4,2,130,537,917,1111],
                    barMinHeight:[2],
                    label: {
                      normal: {
                        show: true,
                        color:"#adfff6",
                        position: 'top'
                      }
                    }
                  }]
              };
             myChart.setOption(chartOptions);
            }else{
              console.log('chart为空')
            }
          }
        },
      mounted(){
        this.drawZzt1();
        this.drawZzt2();
        this.drawZzt3();
        this.drawZzt4();
        this.drawZzt5();
        this.drawZzt6();
      }
    }
</script>

<style scoped>

</style>
