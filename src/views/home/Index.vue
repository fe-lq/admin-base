<script setup lang="ts">
import PieChart from './components/Pie.vue'
import BarChart from './components/Bar.vue'
</script>
<template>
  <div class="home">
    <h1>首页</h1>
    <a-row>
      <a-col :span="12">
        <PieChart />
      </a-col>
      <a-col :span="12">
        <BarChart />
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}

.home {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}
</style>
