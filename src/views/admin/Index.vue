<script setup lang="ts">
import LayoutHeader from '@/layout/Header.vue'
import LayoutMenu from '@/layout/Menu.vue'
import LayoutContent from '@/layout/Content.vue'
import { GarfishInit } from '@/config'
import { onMounted } from 'vue'
console.log('进来')
onMounted(() => {
  GarfishInit()
  console.log(document.querySelector('#subApp'))
})
</script>

<template>
  <LayoutHeader />
  <ElContainer>
    <LayoutMenu />
    <RouterView name="notFound" />
    <LayoutContent />
  </ElContainer>
</template>

<style scoped lang="scss">
.el-container {
  height: calc(100% - 60px);
}
</style>
