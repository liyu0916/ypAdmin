<template>
  <d2-container>
    <el-row :gutter="20" class="d2-mt">
      <el-col :span="12">
        <el-card>
          <ve-pie :data="chartData" :extend="extend"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ve-pie :data="chartData" :settings="chartSettings" :extend="extend1"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" :gutter="20">
      <el-col :span="12">
        <el-card>
          <ve-pie :data="chartData" :settings="chartSettings1" :extend="extend2"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ve-ring :data="chartData" :settings="chartSettings2" :extend="extend3"></ve-ring>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" slot="footer">
      可参考echarts配置项文档: <d2-link-btn  link="https://echarts.apache.org/zh/option.html#title.right"/>
      <d2-link-btn title="依赖" link="https://v-charts.js.org/#/pie"/>
    </el-row>
  </d2-container>
</template>
<script>
    export default {
      name: "echart-bt",
      data(){
          this.extend = {
            title:{
              show:true,
              text:"饼 图",
              textStyle:{
                fontSize:14
              },
              bottom:10,
              left:"center"
            }
          },
          this.extend1={
            title:{
              show:true,
              text:"玫 瑰 图",
              textStyle:{
                fontSize:14
              },
              bottom:10,
              left:"center"
            }
          },
          this.extend2={
            title:{
              show:true,
              text:"多 圆 饼 图",
              textStyle:{
                fontSize:14
              },
              bottom:10,
              left:"center"
            }
          },
          this.extend3={
              title:{
                show:true,
                text:"环形图",
                textStyle:{
                  fontSize:14
                },
                bottom:10,
                left:"center"
              }
            },
          this.chartSettings = {
          roseType: 'radius',
          },
          this.chartSettings1 = {
            level: [
              ['1/1', '1/2', '1/3'],
              ['1/4', '1/5']
            ],
          },
          this.chartSettings2= {
            limitShowNum: 5,
            dataType: 'percent'
          }
        return{
          chartData: {
            columns: ['日期', '访问用户'],
            rows: [
              { '日期': '1/1', '访问用户': 1393 },
              { '日期': '1/2', '访问用户': 3530 },
              { '日期': '1/3', '访问用户': 2923 },
              { '日期': '1/4', '访问用户': 1723 },
              { '日期': '1/5', '访问用户': 3792 },
            ]
          }
        }
      }
    }
</script>

<style scoped>

</style>
