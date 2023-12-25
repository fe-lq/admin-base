<script setup lang="ts">
import { iconOptions } from '@/constants/menu-icons'
import { Form, message, Upload, UploadChangeParam, UploadProps } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref, computed } from 'vue'
import { deleteMenuIcon } from '@/api/menu'

type Value = {
  type: 'icon' | 'image'
  value: string
}

const visible = ref(false)
const fileList = ref([])

const url = import.meta.env.VITE_APP_BASE

const props = defineProps<{ value?: Value }>()
const emits = defineEmits<{ (e: 'update:value', value?: Value): void }>()

const iconItem = computed(() => iconOptions.find((item) => item.value === props.value?.value))
const iconField = computed(() => props.value)

const formItemContext = Form.useInjectFormItemContext()

const triggerChange = (changedValue?: Value) => {
  emits('update:value', changedValue)
  formItemContext.onFieldChange()
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    /**
     * 当静态文件夹部署在服务器是用filepath
     * 本地测试先用newFilename
     */
    const link = info.file.response.data.newFilename
    triggerChange({
      type: 'image',
      value: link,
    })
    message.success('上传成功')
  } else if (info.file.status === 'error') {
    message.error('上传失败')
  }
}

const handleClearIcon = async () => {
  if (iconField.value?.type === 'image') {
    try {
      await deleteMenuIcon({ filePath: iconField.value?.value })
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

const handleSelectIcon = async (icon: string) => {
  visible.value = false
  // iconValue.value = icon
  triggerChange({ type: 'icon', value: icon })
  // 如果存在自定义上传文件就清空
  if (iconField.value && iconField.value.type === 'image') {
    await deleteMenuIcon({ filePath: iconField.value.value })
  }
}
</script>
<template>
  <a-space>
    <a-popover v-model:open="visible" trigger="click">
      <template #content>
        <div class="icons-content">
          <div
            v-for="item in iconOptions"
            :key="item.value"
            class="iconItem"
            @click="() => handleSelectIcon(item.value)"
          >
            <component :is="item.icon"></component>
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
      :action="`${url}/files/icon/upload`"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div>
        <upload-outlined />
        上传自定义文件
      </div>
    </a-upload>
    <component
      :is="iconItem?.icon"
      v-else-if="iconField.type === 'icon'"
      style="font-size: 28px"
    ></component>
    <img
      v-else-if="iconField.type === 'image'"
      class="icon-img"
      :src="`http://127.0.0.1:5500/public/icons/${iconField.value}`"
    />
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
  font-size: 30px;
  padding: 0 10px;
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
