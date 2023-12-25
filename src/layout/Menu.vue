<script lang="ts" setup>
import { ref } from 'vue'
import { menuConfig } from '@/mock/menu'
import Garfish from 'garfish'
import {} from 'vue-router'

const isCollapse = ref(false)

const handleClick = (path: string) => {
  /**
   * 使用vue-router的跳转有渲染不到的问题
   * 只能使用微应用自带的编程式导航统一各个微应用调转方式
   */
  Garfish.router.push({ path })
}
</script>

<template>
  <a-layout-sider width="200px" :collapse="isCollapse" collapsible>
    <a-menu mode="inline" @click="(info) => handleClick(info.key as string)">
      <template v-for="item in menuConfig">
        <a-sub-menu v-if="item.children?.length" :key="item.id">
          <template #title>
            <component :is="item.icon"></component>
            <span>{{ item.name }}</span>
          </template>
          <a-menu-item v-for="sub in item.children" :key="sub.path">
            <span>{{ sub.name }}</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.path">
          <component :is="item.icon"></component>
          <span>{{ item.name }}</span>
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
}
.sider-footer {
  font-size: 18px;
  color: #000;
  background-color: #fff;
}
</style>
