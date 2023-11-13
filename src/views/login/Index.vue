<script setup lang="ts">
import RegisterModal from '@/components/login/RegisterModal.vue'
import { reactive, ref } from 'vue'
import { loginApi } from '@/api/user'
import imgUrl from '@/assets/back.jpg'

interface FormType {
  phone: string
  password: string
}

const dialogVisible = ref<boolean>(false)
const formFields = reactive<FormType>({
  phone: '',
  password: '',
})

const handleLogin = async () => {
  console.log(formFields, '登录')
  try {
    await loginApi(formFields)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="login-page">
    <img :src="imgUrl" alt="背景" style="width: 100%" />
    <div class="login-content">
      <div class="login-title">管理系统</div>
      <el-form label-width="100px" :model="formFields" style="max-width: 460px">
        <el-form-item label="手机号">
          <el-input v-model="formFields.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formFields.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button plain type="primary" @click="dialogVisible = true"> 注册 </el-button>
      </div>
    </div>
  </div>
  <RegisterModal v-model:dialogVisible="dialogVisible" />
</template>

<style scoped lang="scss">
@import '@/scss/index.scss';
// @/assets/back.jpg
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
