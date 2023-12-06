<script setup lang="ts">
import { useBaseStore } from '@/stores'
const baseStore = useBaseStore()
</script>
<template>
  <a-layout-content>
    <RouterView />
    <div id="subApp">
      <!-- 未加载微应用时的站位 -->
      <div v-if="!baseStore.isMounted"></div>
    </div>
  </a-layout-content>
</template>
<style scoped lang="scss">
.ant-layout-content {
  padding: 10px;
}
</style>
