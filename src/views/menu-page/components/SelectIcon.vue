<script setup lang="ts">
import { Form, message, Upload, UploadChangeParam, UploadProps } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref, computed, onBeforeMount } from 'vue'
import { deleteMenuIcon, getMenuIcons } from '@/api/menu'
import { IconOption } from '@/types/menu'

const visible = ref(false)
const fileList = ref([])
const iconOptions = ref<IconOption[]>([])
const isCustom = ref(false)

const url = import.meta.env.VITE_APP_BASE

const props = defineProps<{ value?: string }>()
const emits = defineEmits<{ (e: 'update:value', value?: string): void }>()

const iconField = computed(() => props.value || '')

const formItemContext = Form.useInjectFormItemContext()

onBeforeMount(async () => {
  const { data } = await getMenuIcons()
  iconOptions.value = data
})

const triggerChange = (changedValue?: string) => {
  emits('update:value', changedValue)
  formItemContext.onFieldChange()
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    /**
     * 当静态文件夹部署在服务器是用filepath
     * 本地测试先用newFilename
     */
    const link = info.file.response.data.path
    triggerChange(link)
    isCustom.value = true
    message.success('上传成功')
  } else if (info.file.status === 'error') {
    message.error('上传失败')
  }
}

const handleClearIcon = async () => {
  if (iconField.value && isCustom.value) {
    try {
      await deleteMenuIcon({ filePath: iconField.value })
      isCustom.value = false
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
      return false
    }
  }
  triggerChange(undefined)
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isSVG = file.type === 'image/svg+xml'
  if (!isSVG) {
    message.warning('请上传svg文件')
  }
  // 使用Upload.LIST_IGNORE 不在列表展示
  return isSVG || Upload.LIST_IGNORE
}

const handleSelectIcon = async (iconPath: string) => {
  visible.value = false

  triggerChange(iconPath)
  // 如果存在自定义上传文件就清空
  if (iconField.value) {
    await deleteMenuIcon({ filePath: iconField.value })
    isCustom.value = false
  }
}
</script>
<template>
  <a-space>
    <a-popover v-model:open="visible" trigger="click">
      <template #content>
        <div class="icons-content">
          <div
            v-for="(item, index) in iconOptions"
            :key="index"
            class="iconItem"
            @click="() => handleSelectIcon(item.path)"
          >
            <img class="icon-img" :src="item.path" />
          </div>
        </div>
      </template>
      <a-button>选择图标</a-button>
    </a-popover>

    <a-upload
      v-if="!iconField"
      v-model:file-list="fileList"
      name="file"
      class="btn-upload"
      :maxCount="1"
      list-type="picture-card"
      :showUploadList="false"
      accept="image/svg+xml"
      :action="`${url}/menu/icon/upload`"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div>
        <upload-outlined />
        上传自定义文件
      </div>
    </a-upload>
    <img v-else class="icon-img" :src="iconField" />
    <a-button v-if="iconField" type="link" style="padding: 0" @click="handleClearIcon"
      >清除</a-button
    >
  </a-space>
</template>

<style lang="scss" scoped>
.icons-content {
  width: 180px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.iconItem {
  padding: 8px;
  border: 1px solid #bab6b6;
  border-radius: 8px;
}

.icon-img {
  vertical-align: middle;
  width: 32px;
}

.btn-upload {
  :deep(.ant-upload.ant-upload-select-picture-card) {
    width: 140px;
    height: 32px;
    margin: 0;
  }
  .ant-upload-list-item-container {
  }
}
</style>
