<template>
  <d2-container>
    <!--<div id="zxt" ref="v-charts"></div>-->
    <el-row :gutter="20" class="d2-mt">
      <el-col  :span="12">
        <el-card>
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ve-line :data="chartData" :extend="extend"></ve-line>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" slot="footer">
      可参考echarts配置项文档:<d2-link-btn  link="https://echarts.apache.org/zh/option.html#title.right"/>
      <d2-link-btn title="依赖" link="https://v-charts.js.org/#/line"/>
    </el-row>
  </d2-container>
</template>
<script>
  export default {
    name: "echart",
    data(){
      this.extend = {
        'xAxis.0.axisLabel.rotate': 45,
        series:{
          label:{
            normal:{
              show:true
            }
          }
        },
        title:{
          show:true,
          text:"示列",
          textStyle:{
            fontSize:14
          },
          bottom:10,
          left:'50%'
        }
      },
      this.chartSettings = {
          stack: { '用户': ['访问用户', '下单用户'] },
          area: true
        }
       return{
       chartData: {
         columns: ['日期', '访问用户', '下单用户', '下单率'],
         rows: [
           { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
           { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
           { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
           { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
           { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
           { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
         ]
       }
     }
    },
    mounted(){

    },
    methods:{

        },
  }
</script>

<style scoped>
/*#zxt{*/
  /*width: 500px;*/
  /*height: 500px;*/
  /*border: 1px solid #00a0e9;*/
/*}*/
</style>
