<script setup lang="tsx">
import { LeftOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
// TODO: 支持搜索菜单
const search = ref()
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
import logoSrc from '@/assets/imgs/logo.jpg'
import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { loginOutApi } from '@/api/user'
import { message } from 'ant-design-vue'
import router from '@/routers'

const baseStore = useBaseStore()
const { userInfo } = storeToRefs(baseStore)

const handleLoginOut = async () => {
  try {
    await loginOutApi()
    localStorage.removeItem('token')
    router.replace('/login')
    message.success('退出成功')
  } catch (error: any) {
    message.error(error.message)
  }
}
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
          <a-input v-model:value="search" placeholder="请搜索功能">
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
              <div class="info-card">
                <a-avatar :size="80" :src="url" />
                <div class="info-name">{{ userInfo.userName }}</div>
                <div>{{ userInfo.role }}</div>
                <div class="info-line"></div>
                <a-popover title="语言类型" trigger="click" placement="left">
                  <!-- TODO: 支持国际化 -->
                  <template #content>
                    <div>中文</div>
                    <div>英语</div>
                  </template>
                  <a-button block type="text">
                    <div class="change-language">
                      <LeftOutlined class="language-icon" />
                      切换语言
                    </div>
                  </a-button>
                </a-popover>

                <a-button type="primary" @click="handleLoginOut">退 出</a-button>
              </div>
            </template>
            <div class="header-user">
              <a-avatar :size="40" :src="url" />
              <div style="margin-left: 6px">{{ userInfo.userName }}</div>
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
.ant-popover-inner-content {
  .info-card {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .info-name {
      font-size: 18px;
      font-weight: 600;
    }

    .info-line {
      width: 100%;
      border-bottom: 1px solid #0000003b;
    }

    .change-language {
      width: 100%;
      text-align: center;
      position: relative;
    }

    .language-icon {
      position: absolute;
      left: -18px;
      top: 20%;
    }
  }
}
</style>
