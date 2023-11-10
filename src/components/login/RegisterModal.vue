<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { loginApi } from '@/api/user'

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
  <el-dialog v-model="visible" header="注册信息" width="30%" center>
    <el-form label-width="100px" :model="formFields" style="max-width: 460px">
      <el-form-item label="用户名">
        <el-input v-model="formFields.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formFields.phone" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formFields.password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleRegister"> 确认 </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
