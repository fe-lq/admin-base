<script setup lang="ts">
import { computed, reactive } from 'vue'

interface FormType {
  userName?: string
  phone?: string
  password?: string
}

interface Props {
  dialogVisible: boolean
}
type Emits = {
  'update:dialogVisible': [value: boolean]
}

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
  console.log(formFields, '注册')
  visible.value = false
  // emit('update:dialogVisible', value)
  // try {
  //   await loginApi(formFields)
  // } catch (error) {
  //   console.log(error)
  // }
}
</script>

<template>
  <a-modal v-model:open="visible" header="注册信息" width="30%" center>
    <a-form label-width="100px" :model="formFields" style="max-width: 460px">
      <a-form-item label="用户名">
        <a-input v-model:value="formFields.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model:value="formFields.phone" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="formFields.password" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="handleRegister"> 确认 </a-button>
    </template>
  </a-modal>
</template>

<style scoped lang="scss"></style>
