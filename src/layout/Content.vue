<script setup lang="ts">
import { useBaseStore } from '@/stores'
const baseStore = useBaseStore()
</script>
<template>
  <ElMain>
    <RouterView />
    <div id="subApp">
      <!-- 未加载微应用时的站位 -->
      <div v-if="!baseStore.isMounted" v-loading="!baseStore.isMounted" style="height: 450px"></div>
    </div>
  </ElMain>
</template>
