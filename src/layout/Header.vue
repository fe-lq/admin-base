<script setup lang="tsx">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input = ref()
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
import logoSrc from '@/assets/logo.jpg'
</script>

<template>
  <ElHeader>
    <div class="header" justify="space-between">
      <div class="header-logo">
        <img :src="logoSrc" width="50" />
        <h3 class="header-title">花点Admin</h3>
      </div>
      <div class="user-info">
        <ElSpace>
          <ElInput v-model="input" :prefix-icon="Search" placeholder="请搜索功能" />
          <ElPopover placement="bottom" :width="100" trigger="click">
            <template #reference>
              <div class="header-user">
                <ElAvatar :size="40" fit="fill" :src="url" />
                <div style="margin-left: 6px">用户名</div>
              </div>
            </template>
            <div>"this is content, this is content, this is content"</div>
          </ElPopover>
        </ElSpace>
      </div>
    </div>
  </ElHeader>
</template>

<style scoped lang="scss">
.el-header {
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
