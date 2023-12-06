<script setup lang="ts">
import PieChart from './components/Pie.vue'
import BarChart from './components/Bar.vue'
</script>
<template>
  <div>首页</div>
  <a-row>
    <a-col :span="12">
      <PieChart />
    </a-col>
    <a-col :span="12">
      <BarChart />
    </a-col>
  </a-row>
</template>
