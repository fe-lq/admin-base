<script setup lang="ts">
import LayoutHeader from './components/layout/Header.vue'
import LayoutMenu from './components/layout/Menu.vue'
import LayoutContent from './components/layout/Content.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><LayoutHeader /></el-header>
      <el-container>
        <el-aside width="200px"><LayoutMenu /></el-aside>
        <RouterView name="notFound" />
        <el-main><LayoutContent /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style></style>
