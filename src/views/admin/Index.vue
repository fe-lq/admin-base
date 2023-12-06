<script setup lang="ts">
import LayoutHeader from '@/layout/Header.vue'
import LayoutMenu from '@/layout/Menu.vue'
import LayoutContent from '@/layout/Content.vue'
</script>

<template>
  <a-layout class="admin-layout">
    <LayoutHeader />
    <a-layout class="admin-container">
      <LayoutMenu />
      <LayoutContent />
      <RouterView name="notFound" />
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.admin-layout {
  height: 100%;
}
.admin-container {
  height: calc(100% - 60px);
}
</style>
