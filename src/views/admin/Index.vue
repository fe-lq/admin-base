<script setup lang="ts">
import LayoutHeader from '@/layout/Header.vue'
import LayoutMenu from '@/layout/Menu.vue'
import LayoutContent from '@/layout/Content.vue'
</script>

<template>
  <LayoutHeader />
  <el-container>
    <LayoutMenu />
    <RouterView />
    <RouterView name="notFound" />
    <el-main><LayoutContent /></el-main>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  height: calc(100% - 60px);
}
</style>
