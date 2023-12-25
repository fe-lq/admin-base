<script setup lang="ts"></script>
<template>
  <a-layout-content>
    <RouterView />
    <div id="subApp"></div>
  </a-layout-content>
</template>
<style scoped lang="scss">
.ant-layout-content {
  padding: 10px;
}
</style>
