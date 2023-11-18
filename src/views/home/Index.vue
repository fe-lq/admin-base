<script setup lang="ts">
import PieChart from './components/Pie.vue'
import BarChart from './components/Bar.vue'
</script>
<template>
  <div>首页</div>
  <ElRow>
    <ElCol :span="12">
      <PieChart />
    </ElCol>
    <ElCol :span="12">
      <BarChart />
    </ElCol>
  </ElRow>
</template>
