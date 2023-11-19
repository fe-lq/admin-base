<script lang="ts" setup>
import { ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import { menuConfig } from '@/mock/menu'
import Garfish from 'garfish'
import {} from 'vue-router'

const isCollapse = ref(false)

const handleClick = (key: string) => {
  /**
   * 使用vue-router的跳转有渲染不到的问题
   * 只能使用微应用自带的编程式导航
   */
  Garfish.router.push({ path: key })
}
</script>

<template>
  <ElAside width="200px">
    <ElMenu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" router>
      <template v-for="item in menuConfig" :key="item.id">
        <ElSubMenu v-if="item.children?.length" :index="item.path">
          <template #title>
            <ElIcon><component :is="item.icon"></component></ElIcon>
            <span>{{ item.name }}</span>
          </template>
          <ElMenuItem v-for="sub in item.children" :key="sub.id" :index="sub.path">
            {{ sub.name }}
          </ElMenuItem>
        </ElSubMenu>
        <ElMenuItem v-else :index="item.path">
          <ElIcon><component :is="item.icon"></component></ElIcon>
          <template #title>{{ item.name }}</template>
        </ElMenuItem>
      </template>
      <ElMenuItem class="menu-footer">
        <ElIcon v-if="!isCollapse" size="20px" @click="isCollapse = true"><Fold /></ElIcon>
        <ElIcon v-else size="20px" @click="isCollapse = false"><Expand /></ElIcon>
      </ElMenuItem>
    </ElMenu>
  </ElAside>
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
