<script setup lang="ts">
import noPageUrl from '@/assets/imgs/404.png'
import errorUrl from '@/assets/imgs/error.png'
const { tag } = defineProps<{ tag: string }>()
</script>
<template>
  <a-result>
    <template #icon>
      <a-image width="600px" :preview="false" :src="tag === 'errorPage' ? errorUrl : noPageUrl" />
    </template>
  </a-result>
</template>
