<script setup lang="ts">
import type { StyleValue } from 'vue'
interface Props {
  style?: StyleValue
  className?: string
}

/**
 * 内容卡片
 */
const props = defineProps<Props>()
</script>

<template>
  <div :style="props.style" :class="['content-card', props.className]">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.content-card {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}
</style>
