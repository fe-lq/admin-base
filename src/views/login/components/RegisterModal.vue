<script setup lang="ts">
import { registerApi } from '@/api/user'
import { computed, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { FormInstance, Rule } from 'ant-design-vue/es/form'
import { genEncryptPsw } from '@/utils'
import { UserInfo } from '@/types/login'
import { omit } from 'lodash-es'
type FormType = UserInfo & {
  checkPassword?: string
}

interface Props {
  dialogVisible: boolean
}
type Emits = {
  'update:dialogVisible': [value: boolean]
}
const formRef = ref<FormInstance>()
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const visible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emit('update:dialogVisible', value)
  },
})

const formFields = reactive<FormType>({})

const handleRegister = async () => {
  await formRef.value?.validateFields()
  const cipherText = genEncryptPsw(formFields.password as string)
  try {
    await registerApi({ ...omit(formFields, 'checkPassword'), password: cipherText })
    message.success('注册成功')
    emit('update:dialogVisible', false)
  } catch (error) {
    message.error('注册失败')
  }
}
const validatePass = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入密码')
  } else {
    if (value.length < 6 || value.length > 20) {
      return Promise.reject('密码长度为6-20')
    }
    if (formFields.checkPassword) {
      formRef.value?.validateFields('checkPassword')
    }
    return Promise.resolve()
  }
}
const validateCheckPass = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请再次输入密码')
  } else if (value !== formFields.password) {
    return Promise.reject('两次密码不一致！')
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur', max: 12 }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { message: '请输入正确的手机号', trigger: 'blur', pattern: /^\d{11}$/ },
  ],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ required: true, validator: validateCheckPass, trigger: 'blur' }],
  email: [
    {
      message: '请输入正确的邮箱',
      trigger: 'blur',
      pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    },
  ],
}
const resetForm = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <a-modal v-model:open="visible" title="注册信息" width="30%" center :afterClose="resetForm">
    <a-form
      ref="formRef"
      label-width="100px"
      :model="formFields"
      :label-col="{ span: 5 }"
      :rules="rules"
      style="max-width: 460px"
    >
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="formFields.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formFields.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
          v-model:value="formFields.password"
          has-feedback
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item label="确认密码" name="checkPassword">
        <a-input-password
          v-model:value="formFields.checkPassword"
          has-feedback
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formFields.email" placeholder="请输入邮箱" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="handleRegister"> 确认 </a-button>
    </template>
  </a-modal>
</template>

<style scoped lang="scss"></style>
