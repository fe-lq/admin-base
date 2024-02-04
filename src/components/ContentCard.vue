<script setup lang="ts">
import type { StyleValue } from 'vue'

interface Props {
  title?: string
  loading?: boolean
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
    <div v-if="!!props.title" class="title">{{ props.title }}</div>
    <a-spin :spinning="props.loading">
      <slot></slot>
    </a-spin>
  </div>
</template>

<style scoped lang="scss">
.content-card {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;

  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
