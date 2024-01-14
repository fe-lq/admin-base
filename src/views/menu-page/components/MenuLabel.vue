<script setup lang="ts">
import { MenuInjectKey } from '@/constants'
import { MenuItem, ProvideValues, MenuAction } from '@/types/menu'
import { MenuOutlined } from '@ant-design/icons-vue'
import { inject, ref } from 'vue'

const props = defineProps<{
  item: MenuItem
}>()
const emits = defineEmits<{ (e: 'update:value', value?: boolean): void }>()

const handleAction = inject(MenuInjectKey) as ProvideValues['action']

const showOperateId = ref<number>()
</script>

<template>
  <a-row
    justify="space-between"
    @mouseenter="showOperateId = props.item.id"
    @mouseleave="showOperateId = undefined"
  >
    <a-col>{{ props.item.menuName }}</a-col>
    <a-col v-show="showOperateId === props.item.id">
      <a-button type="text" @click.stop="handleAction(MenuAction.EDIT, props.item)">编辑</a-button>
      <a-button type="text" @click.stop="handleAction(MenuAction.ADD, props.item)">新增</a-button>
      <a-button type="text" danger @click.stop="handleAction(MenuAction.DELETE, props.item)"
        >删除</a-button
      >
      <a-button type="text" @click.stop="handleAction(MenuAction.VIEW, props.item)">查看</a-button>
      <a-button
        type="text"
        class="move-btn"
        @mousedown="emits('update:value', true)"
        @mouseleave="emits('update:value', false)"
      >
        <MenuOutlined />
      </a-button>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">
.ant-btn-text,
.move-btn {
  color: #0000005e;

  &:not(:disabled):hover {
    color: #4096ff;
    background-color: unset;
  }
  &.ant-btn-dangerous:not(:disabled):hover {
    color: #ff4d4f;
    background-color: unset;
  }
}
.move-btn {
  cursor: move;
}
</style>
