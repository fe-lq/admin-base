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
      text: '示例',
    },
    xAxis: {
      data: ['玫瑰花', '郁金香', '金钱树', '富贵竹', '含羞草', '向日葵'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        color: '#3398DB',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  })
})
</script>
<template>
  <div ref="chartRef" style="height: 400px; width: 600px"></div>
</template>
