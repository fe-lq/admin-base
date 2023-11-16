<script setup lang="ts">
import LayoutHeader from '@/layout/Header.vue'
import LayoutMenu from '@/layout/Menu.vue'
import LayoutContent from '@/layout/Content.vue'
</script>

<template>
  <el-container direction="vertical">
    <LayoutHeader />
    <el-container>
      <LayoutMenu />
      <RouterView name="notFound" />
      <RouterView name="home" />
      <el-main><LayoutContent /></el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  height: 100%;
}
</style>
