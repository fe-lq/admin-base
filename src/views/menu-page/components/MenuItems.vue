<script setup lang="ts">
import { ref } from 'vue'
import { vDrag } from '@/directives/drag'
import { MenuItem } from '@/types/menu'
import MenuItems from './MenuItems.vue'
import MenuLabel from './MenuLabel.vue'

// 获取props中的menus和level
const props = defineProps<{
  menus: MenuItem[]
}>()

// 是否开启拖拽
const enableDrag = ref<boolean>(false)
</script>

<template>
  <div
    v-for="item in props.menus"
    :key="item.menuName"
    v-drag="{ data: props.menus, id: item.id, enableDrag }"
    :data-level="item.parentId"
    class="menu-items"
  >
    <a-sub-menu v-if="item.children?.length" :key="item.menuName" :disabled="false">
      <template #title>
        <MenuLabel v-model:value="enableDrag" :item="item" />
      </template>
      <MenuItems :menus="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.menuPath">
      <MenuLabel v-model:value="enableDrag" :item="item" />
    </a-menu-item>
  </div>
</template>

<style lang="scss" scoped>
.menu-items {
  // 修改组件样式
  :deep(.ant-menu-submenu-title:active) {
    background-color: unset;
  }

  :deep(.ant-menu-item:not(.ant-menu-item-selected):active) {
    background-color: unset;
  }

  :deep(.ant-menu-item-selected) {
    background-color: unset;
  }
  // 修改组件样式
  .ant-btn-text,
  .move-btn {
    color: #0000005e;

    &:not(:disabled):hover {
      color: #4096ff;
      background-color: unset;
    }
  }
  .move-btn {
    cursor: move;
  }
}
</style>
