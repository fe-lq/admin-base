<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const pieRef = ref()
onMounted(() => {
  const pieChart = echarts.init(pieRef.value)

  const pieOption = {
    title: {
      text: '数据',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  pieChart.setOption(pieOption)
})
</script>
<template>
  <div ref="pieRef" style="height: 400px; width: 600px"></div>
</template>
