<script lang="ts" setup>
import { ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import { menuConfig } from '@/mock/menu'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in menuConfig" :key="item.id">
        <el-sub-menu v-if="item.children?.length" :index="item.path">
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="sub in item.children" :key="sub.id" :index="sub.path">
            {{ sub.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon><component :is="item.icon"></component></el-icon>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </template>
      <el-menu-item class="menu-footer">
        <el-icon v-if="!isCollapse" size="20px" @click="isCollapse = true"><Fold /></el-icon>
        <el-icon v-else size="20px" @click="isCollapse = false"><Expand /></el-icon>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  display: flex;
  flex-direction: column;
  .el-menu {
    flex: 1;
    padding-bottom: 30px;
    .menu-footer {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 30px;
      padding: 0 5px;
    }

    &.el-menu--collapse {
      .menu-footer {
        padding: 0 var(--el-menu-base-level-padding);
      }
    }
  }
}
</style>
