<script setup lang="ts">
import imgUrl from '@/assets/imgs/404.png'
</script>
<template>
  <ElResult>
    <template #icon>
      <div style="width: 500px">
        <ElImage :src="imgUrl" />
      </div>
    </template>
  </ElResult>
</template>
