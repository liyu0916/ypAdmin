<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <ve-funnel :data="chartData"></ve-funnel>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ve-funnel :data="chartData" :settings="chartSettings"></ve-funnel>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" slot="footer">
      可参考echarts配置项文档: <d2-link-btn  link="https://echarts.apache.org/zh/option.html#title.right"/>
      <d2-link-btn title="依赖" link="https://v-charts.js.org/#/funnel"/>
    </el-row>
  </d2-container>
</template>

<script>
    export default {
        name: "vchart-ldt",
      data(){
        this.chartSettings = {
          ascending: true
        }
          return{
            chartData: {
              columns: ['状态', '数值'],
              rows: [
                { '状态': '展示', '数值': 900 },
                { '状态': '访问', '数值': 600 },
                { '状态': '点击', '数值': 300 },
                { '状态': '订单', '数值': 100 }
              ]
            }
          }
      }
    }
</script>

<style scoped>

</style>
