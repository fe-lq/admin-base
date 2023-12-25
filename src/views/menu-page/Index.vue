<script setup lang="ts">
import { reactive } from 'vue'
import MenuItems from './components/MenuItems.vue'

import ContentCard from '@/components/ContentCard.vue'
import SelectIcon from './components/SelectIcon.vue'
import { MenuItem } from '@/types/menu'

interface FormValues {
  menuName?: string
  permNode?: string
  icon?: {
    type: 'icon' | 'image'
    value: string
  }
  menuPath?: string
}

const menuConfig = reactive<MenuItem[]>([
  {
    id: '1',
    name: '菜单1',
    path: '/menu1',
    perm: 'MENU1',
    children: [
      {
        id: '101',
        name: '菜单1-1',
        perm: 'MENU1_1',
        path: '/menu1-1',
      },
      {
        id: '102',
        name: '菜单1-2',
        perm: 'MENU1_2',
        path: '/menu1-2',
        children: [
          {
            id: '10201',
            name: '菜单1-2-1',
            perm: 'MENU1_2_1',
            path: '/menu1-2-1',
          },
          {
            id: '10202',
            name: '菜单1-2-2',
            perm: 'MENU1_2_2',
            path: '/menu1-2-2',
          },
        ],
      },
      {
        id: '103',
        name: '菜单1-3',
        perm: 'MENU1_3',
        path: '/menu1-3',
      },
    ],
  },
  {
    id: '2',
    name: '菜单2',
    perm: 'MENU2',
    path: '/menu2',
    children: [
      {
        id: '201',
        name: '菜单2-1',
        perm: 'MENU2_1',
        path: '/menu2-1',
      },
      {
        id: '202',
        name: '菜单2-2',
        perm: 'MENU2_2',
        path: '/menu2-2',
        children: [
          {
            id: '20201',
            name: '菜单2-2-1',
            perm: 'MENU2_2_1',
            path: '/menu2-2-1',
          },
          {
            id: '20202',
            name: '菜单2-2-2',
            perm: 'MENU2_2_2',
            path: '/menu2-2-2',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '菜单3',
    perm: 'MENU3',
    path: '/menu3',
  },
  {
    id: '4',
    name: '菜单4',
    perm: 'MENU4',
    path: '/menu4',
  },
  {
    id: '5',
    name: '菜单5',
    perm: 'MENU5',
    path: '/menu5',
  },
])

const formValues = reactive<FormValues>({})

const handleSave = () => {
  console.log('保存', formValues)
}
</script>

<template>
  <ContentCard style="height: 100%">
    <div>菜单设置</div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-menu mode="inline">
          <MenuItems :menus="menuConfig" />
        </a-menu>
      </a-col>
      <a-col :span="12">
        <a-form>
          <a-form-item label="菜单名称">
            <a-input v-model:value="formValues.menuName" placeholder="请输入名称" />
          </a-form-item>
          <a-form-item name="icon" label="菜单图标">
            <SelectIcon v-model:value="formValues.icon" />
          </a-form-item>
          <a-form-item label="菜单地址">
            <a-input
              v-model:value="formValues.menuPath"
              prefix="/admin"
              placeholder="请输入URL路径"
            />
          </a-form-item>
          <a-form-item label="权限节点">
            <a-input v-model:value="formValues.permNode" placeholder="请输入权限节点" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSave">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </ContentCard>
</template>

<style lang="scss" scoped></style>
