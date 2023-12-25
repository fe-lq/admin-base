<script setup lang="ts">
import { ref } from 'vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import { vDrag } from '@/directives/drag'
import { MenuItem } from '@/types/menu'
import MenuItems from './MenuItems.vue'

// 获取props中的menus和level
const { menus, level = 0 } = defineProps<{
  menus: MenuItem[]
  level?: number
}>()

// 创建新的level
const newLevel = ref<number>(level)
// 创建菜单配置
const menuConfig = ref<MenuItem[]>(menus)

// 是否显示操作项
const showOperate = ref<string>()
// 是否开启拖拽
const enableDrag = ref<boolean>(false)
</script>
<template>
  <div
    v-for="item in menuConfig"
    :key="item.name"
    v-drag="{ data: menuConfig, id: item.id, enableDrag }"
    :data-level="newLevel"
    class="menu-items"
  >
    <a-sub-menu v-if="item.children?.length" :key="item.name">
      <template #title>
        <a-row
          justify="space-between"
          @mouseenter="showOperate = item.id"
          @mouseleave="showOperate = undefined"
        >
          <a-col>{{ item.name }}</a-col>
          <a-col v-show="showOperate === item.id">
            <a-button
              type="text"
              @click.stop="
                (e) => {
                  console.log('点击了')
                }
              "
              >编辑</a-button
            >
            <a-button
              type="text"
              @click.stop="
                (e) => {
                  console.log('点击了')
                }
              "
              >新增</a-button
            >
            <a-button
              type="text"
              class="move-btn"
              @mousedown="enableDrag = true"
              @mouseleave="enableDrag = false"
            >
              <MenuOutlined />
            </a-button>
          </a-col>
        </a-row>
      </template>
      <MenuItems :menus="item.children" :level="newLevel + 1" />
    </a-sub-menu>
    <a-menu-item
      v-else
      :key="item.path"
      @mouseenter="showOperate = item.id"
      @mouseleave="showOperate = undefined"
    >
      <a-row justify="space-between">
        <a-col>{{ item.name }}</a-col>
        <a-col v-show="showOperate === item.id">
          <a-button type="text">编辑</a-button>
          <a-button type="text">新增</a-button>
          <a-button
            type="text"
            class="move-btn"
            @mousedown="enableDrag = true"
            @mouseleave="enableDrag = false"
          >
            <MenuOutlined />
          </a-button>
        </a-col>
      </a-row>
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
