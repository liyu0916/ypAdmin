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
    <el-row class="d2-mt" slot="footer">
      可参考echarts配置项文档: <d2-link-btn  link="https://echarts.apache.org/zh/option.html#title.right"/>
    </el-row>
  </d2-container>
</template>
<script>
  import echarts from 'echarts'
    export default {
      name: "echarts-bt",
      methods:{
        drawBt1(){
          let chart1 = this.$refs.chart1;
          if(chart1){
            let myChart = this.$echarts.init(chart1)
            let option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.setOption(option);
          }else{
            console.log("v-charts 为空")
          }
        },
        drawBt2(){
          let chart2 = this.$refs.chart2;
          if(chart2){
            let myChart = this.$echarts.init(chart2)
            let option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 10,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                  ]
                }
              ]
            };
            myChart.setOption(option);
          }else{
            console.log("v-charts 为空")
          }
        },
        drawBt3(){
          let chart3 = this.$refs.chart3;
          if(chart3){
            let myChart = this.$echarts.init(chart3)
            let  option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              toolbox: {
                show: true,
                feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false},
                  magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                  },
                  restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              series: [
                {
                  name: '面积模式',
                  type: 'pie',
                  radius: [30, 110],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  data: [
                    {value: 10, name: 'rose1'},
                    {value: 5, name: 'rose2'},
                    {value: 15, name: 'rose3'},
                    {value: 25, name: 'rose4'},
                    {value: 20, name: 'rose5'},
                    {value: 35, name: 'rose6'},
                    {value: 30, name: 'rose7'},
                    {value: 40, name: 'rose8'}
                  ]
                }
              ]
            };

            myChart.setOption(option);
          }else{
            console.log("v-charts 为空")
          }
        },
        drawBt4(){
          let chart4 = this.$refs.chart4;
          if(chart4){
            let myChart = this.$echarts.init(chart4)
            let option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                  colorLightness: [0, 1]
                }
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '65%',
                  center: ['50%', '50%'],
                  data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 274, name: '联盟广告'},
                    {value: 235, name: '视频广告'},
                    {value: 400, name: '搜索引擎'}
                  ].sort(function (a, b) { return a.value - b.value; }),
                  roseType: 'radius',
                  label: {
                    // color: 'rgba(255, 255, 255, 0.3)'
                  },
                  labelLine: {
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  },
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                    return Math.random() * 200;
                  }
                }
              ]
            };
            myChart.setOption(option);
          }else{
            console.log("v-charts 为空")
          }
        },
      },
      mounted(){
        this.drawBt1();
        this.drawBt2();
        this.drawBt3();
        this.drawBt4()
      }
    }
</script>

<style scoped>

</style>
