<script setup lang="ts">
import RegisterModal from './components/RegisterModal.vue'
import { reactive, ref } from 'vue'
import { loginApi } from '@/api/user'
import imgUrl from '@/assets/imgs/back.jpg'
import { message } from 'ant-design-vue'
import { genEncryptPsw } from '@/utils'
import { LoginParams } from '@/types/login'
import router from '@/routers'

const dialogVisible = ref<boolean>(false)
const loading = ref<boolean>(false)
const formFields = reactive<LoginParams>({
  phone: '',
  password: '',
})

const handleLogin = async () => {
  const cipherText = genEncryptPsw(formFields.password as string)
  try {
    loading.value = true
    const {
      data: { token },
    } = await loginApi({ ...formFields, password: cipherText })
    localStorage.setItem('token', token)

    router.replace('/admin/home')
  } catch (error: any) {
    message.error(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <a-spin :spinning="loading">
    <div class="login-page">
      <img :src="imgUrl" alt="背景" style="width: 100%" />
      <div class="login-content">
        <div class="login-title">管理系统</div>
        <a-form label-width="100px" :model="formFields" :label-col="{ span: 4 }" style="max-width: 460px">
          <a-form-item label="手机号">
            <a-input v-model:value="formFields.phone" placeholder="请输入手机号" />
          </a-form-item>
          <a-form-item label="密码">
            <a-input-password v-model:value="formFields.password" placeholder="请输入密码" />
          </a-form-item>
        </a-form>
        <div class="login-footer">
          <a-button type="primary" @click="handleLogin">登录</a-button>
          <a-button ghost type="primary" @click="dialogVisible = true"> 注册 </a-button>
        </div>
      </div>
    </div>
  </a-spin>
  <RegisterModal v-model:dialogVisible="dialogVisible" />
</template>

<style scoped lang="scss">
@import '@/scss/index.scss';

.login-page {
  height: 100vh;
  overflow: hidden;

  .login-title {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .login-content {
    width: 500px;
    height: max-content;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #ffffffd1;
  }

  .login-footer {
    display: flex;
    justify-content: center;

    button:first-child {
      margin-right: 10px;
    }
  }
}
</style>
