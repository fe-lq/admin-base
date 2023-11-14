<script setup lang="tsx">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input = ref()
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
// import logoSrc from '@/assets/logo.svg'
</script>

<template>
  <el-header>
    <el-row justify="space-between">
      <el-col :span="6">
        <div class="header-logo">
          <!-- <img :src="logoSrc" /> -->
        </div>
      </el-col>
      <el-col :span="6">
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
      </el-col>
    </el-row>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  background-color: #419eff;
}

.el-row {
  height: 100%;

  .el-col:last-child {
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
