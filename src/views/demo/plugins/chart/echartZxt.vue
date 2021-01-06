<template>
  <d2-container>
    <!--<div id="zxt"></div>-->
    <!--<div>2</div>-->
    <!--<div>3</div>-->
  </d2-container>

</template>

<script>
  export default {
        name: "echart",
    mounted(){
      // this.drawZxt1()
    },
    methods:{
          drawZxt1(){
            var chart = this.$echarts.init(document.getElementById("zxt"));
            var option = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
              }]
            };
            chart.setOption(option);
          }
        },

    }
</script>

<style scoped>
#zxt{
  width: 120px;
  height: 120px;
  border: 1px solid #00a0e9;
}
</style>
