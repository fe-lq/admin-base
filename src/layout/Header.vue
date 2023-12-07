<script setup lang="tsx">
import { ref } from 'vue'
const input = ref()
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
import logoSrc from '@/assets/imgs/logo.jpg'
</script>

<template>
  <a-layout-header>
    <div class="header" justify="space-between">
      <div class="header-logo">
        <img :src="logoSrc" width="50" />
        <h3 class="header-title">花点Admin</h3>
      </div>
      <div class="user-info">
        <a-space>
          <a-input v-model:value="input" placeholder="请搜索功能">
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
          <a-popover
            placement="bottom"
            arrowPointAtCenter
            :align="{ offset: [0, -16] }"
            trigger="click"
          >
            <template #content>
              <div>"this is content"</div>
            </template>
            <div class="header-user">
              <a-avatar :size="40" :src="url" />
              <div style="margin-left: 6px">用户名</div>
            </div>
          </a-popover>
        </a-space>
      </div>
    </div>
  </a-layout-header>
</template>

<style scoped lang="scss">
.ant-layout-header {
  background-color: #419eff;
  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .header-title {
    font-weight: 600;
    color: #fefefe;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }
  .user-info {
    display: flex;
    justify-content: end;
  }

  .header-user {
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
