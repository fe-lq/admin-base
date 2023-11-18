<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
// import MapChart from './components/Map.vue'
const chartRef = ref()
onMounted(() => {
  const myChart = echarts.init(chartRef.value)

  // 柱状图
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  })
})
</script>
<template>
  <div ref="chartRef" style="height: 400px; width: 600px"></div>
</template>
