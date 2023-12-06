<script setup lang="ts">
import imgUrl from '@/assets/imgs/404.png'
</script>
<template>
  <a-result>
    <template #icon>
      <a-image width="500px" :preview="false" :src="imgUrl" />
    </template>
  </a-result>
</template>
