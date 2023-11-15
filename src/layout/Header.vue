<script setup lang="tsx">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input = ref()
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
import logoSrc from '@/assets/logo.jpg'
</script>

<template>
  <el-header>
    <div class="header" justify="space-between">
      <div class="header-logo">
        <img :src="logoSrc" width="60" />
      </div>
      <div class="user-info">
        <el-space>
          <el-input v-model="input" :prefix-icon="Search" placeholder="请搜索功能" />
          <el-popover placement="bottom" :width="100" trigger="click">
            <template #reference>
              <div class="header-user">
                <el-avatar :size="40" fit="fill" :src="url" />
                <div style="margin-left: 6px">用户名</div>
              </div>
            </template>
            <div>"this is content, this is content, this is content"</div>
          </el-popover>
        </el-space>
      </div>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  background-color: #419eff;
  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .user-info {
    display: flex;
    justify-content: end;
  }
}

.header-user {
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
