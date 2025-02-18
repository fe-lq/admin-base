<!-- 该在开发环境组件有个bug，修改script中的内容会递归更新，todo：换组件试 -->
<script lang="ts" setup>
import { ref, computed } from 'vue'
import Garfish from 'garfish'
import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { basename } from '@/config/config'
const path = location.pathname.replace(basename, '')

// 获取菜单数据
const baseStore = useBaseStore()
const { menus, flatMenus } = storeToRefs(baseStore)

const activeItemKey = ref(path)
const isCollapse = ref(false)
const openKeys = computed(() => {
  const parentItem = flatMenus.value.find((item) => activeItemKey.value.startsWith(item.menuPath))
  return parentItem ? [parentItem.id] : []
})

const handleClick = (path: string) => {
  activeItemKey.value = path
  /**
   * 使用vue-router的跳转有渲染不到的问题
   * 只能使用微应用自带的编程式导航统一各个微应用调转方式
   */
  Garfish.router.push({ path })
}
</script>

<template>
  <a-layout-sider width="200px" :collapse="isCollapse" collapsible>
    <a-menu mode="inline" :openKeys="openKeys" :selectedKeys="[activeItemKey]"
      @click="(info) => handleClick(info.key as string)">
      <template v-for="item in menus">
        <a-sub-menu v-if="item.children?.length" :key="item.id">
          <template #icon>
            <img class="icon-img" :src="item.icon" />
          </template>
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
          <a-menu-item v-for="sub in item.children" :key="sub.menuPath">
            <template #icon>
              <img v-if="!!sub.icon" class="icon-img" :src="sub.icon" />
            </template>
            <span :style="!!sub.icon ? undefined : { 'margin-left': '10px' }">
              {{ sub.menuName }}
            </span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.menuPath">
          <template #icon>
            <img class="icon-img" :src="item.icon" />
          </template>
          <span>{{ item.menuName }}</span>
        </a-menu-item>
      </template>
    </a-menu>
    <template #trigger>
      <div class="sider-footer">
        <MenuFoldOutlined v-if="!isCollapse" @click="isCollapse = !isCollapse" />
        <MenuUnfoldOutlined v-else @click="isCollapse = !isCollapse" />
      </div>
    </template>
  </a-layout-sider>
</template>

<style scoped lang="scss">
.ant-layout-sider {
  background-color: #fff;
}

.ant-menu {
  height: 100%;
  overflow-y: auto;

  .icon-img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    vertical-align: text-bottom;
  }
}

.sider-footer {
  font-size: 18px;
  color: #000;
  background-color: #fff;
}
</style>
