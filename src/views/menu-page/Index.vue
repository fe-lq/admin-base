<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import MenuItems from './components/MenuItems.vue'

import ContentCard from '@/components/ContentCard.vue'
import SelectIcon from './components/SelectIcon.vue'
import { MenuAction, MenuForm, MenuItem, ProvideValues } from '@/types/menu'
import { addMenu, deleteMenu, getMenuList, updateMenu, updateMenuSort } from '@/api/menu'
import { MenuInjectKey } from '@/constants'
import { getMenuParent } from '@/utils'
import { isEqual, omit } from 'lodash-es'
import { onBeforeMount } from 'vue'
import { watch } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { toValue } from 'vue'

type FetchKey = Exclude<MenuAction, MenuAction.DELETE | MenuAction.VIEW>

const defaultRootMenu = { parent: { name: '花点系统' } }

const saveFetchConfig: Record<FetchKey, typeof addMenu | typeof updateMenu> = {
  [MenuAction.ADD]: addMenu,
  [MenuAction.EDIT]: updateMenu,
}

const actionType = ref<FetchKey>(MenuAction.ADD)
const formValues = ref<MenuForm>(defaultRootMenu)
const menuList = ref<MenuItem[]>([])
const enableSaveSort = ref<boolean>(true)
const enableForm = ref<boolean>(true)

const fetchMenuList = async () => {
  const { data } = await getMenuList()
  menuList.value = [...data]
}

onBeforeMount(() => {
  fetchMenuList()
})

const fetchDelete = async (id: number) => {
  Modal.confirm({
    title: '确定删除该菜单吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await deleteMenu({ id })
      message.success('操作成功')
      fetchMenuList()
    },
  })
}

const setEditFormValues = (menu: MenuItem) => {
  const parentMenu = getMenuParent(menuList.value, menu.parentId)
  if (parentMenu) {
    // 编辑当前菜单
    formValues.value = Object.assign({}, menu, {
      parent: { name: parentMenu.menuName, id: parentMenu.id, path: parentMenu.menuPath },
    })
  } else {
    // 编辑一级菜单
    formValues.value = Object.assign({}, menu, defaultRootMenu)
  }
}

const handleAction: ProvideValues['action'] = (type, menu) => {
  if (menu) {
    switch (type) {
      case MenuAction.ADD:
        actionType.value = type
        enableForm.value = false
        // 在当前菜单下新增菜单
        formValues.value = {
          parent: { name: menu.menuName, id: menu.id, path: menu.menuPath },
          level: menu.children?.length ?? 0,
        }
        break
      case MenuAction.EDIT:
        actionType.value = type
        enableForm.value = false
        setEditFormValues(menu)
        break
      case MenuAction.DELETE:
        fetchDelete(menu.id)
        break
      case MenuAction.VIEW:
        setEditFormValues(menu)
        enableForm.value = true
        break
    }
  } else {
    // 新增一级菜单
    formValues.value = { ...defaultRootMenu, level: menuList.value.length }
  }
}
provide(MenuInjectKey, handleAction)

const sortedMenus = computed<MenuItem[]>(() => {
  return menuList.value.map((item, index) => {
    let children = item.children
    if (item.children?.length) {
      children = item.children.map((sub, index) => ({ ...sub, level: index }))
    }
    return { ...item, level: index, children }
  })
})

watch(
  sortedMenus,
  (val) => {
    const noChange = isEqual(val, toValue(menuList))
    enableSaveSort.value = noChange
  },
  { deep: true },
)

const handleSave = async () => {
  try {
    const params = {
      ...omit(formValues.value, ['parent', 'children']),
      parentId: formValues.value.parent.id,
    } as MenuItem
    await saveFetchConfig[actionType.value](params)
    enableForm.value = true
    message.success('操作成功')
    fetchMenuList()
  } catch (error: any) {
    message.error(error.message)
  }
}

const handleSaveSort = async () => {
  await updateMenuSort(sortedMenus.value)
  message.success('操作成功')
}
</script>

<template>
  <ContentCard style="height: 100%">
    <h3>菜单设置</h3>
    <a-row :gutter="16">
      <a-col :span="12" class="menu-content">
        <a-row justify="space-between" align="middle">
          <a-col push="1"> 花点系统 </a-col>
          <a-col pull="1">
            <a-space>
              <a-button type="primary" size="small" @click.stop="handleAction(MenuAction.ADD)"
                >新增</a-button
              >
              <a-button
                type="primary"
                size="small"
                :disabled="enableSaveSort"
                @click.stop="handleSaveSort"
                >保存顺序</a-button
              >
            </a-space>
          </a-col>
        </a-row>
        <a-menu mode="inline">
          <MenuItems key="99" :menus="menuList" />
        </a-menu>
      </a-col>
      <a-col :span="12">
        <a-form :disabled="enableForm">
          <a-form-item label="上级菜单">
            <a-input v-model:value="formValues.parent.name" disabled />
          </a-form-item>
          <a-form-item label="菜单名称">
            <a-input v-model:value="formValues.menuName" placeholder="请输入名称" />
          </a-form-item>
          <a-form-item name="icon" label="菜单图标">
            <SelectIcon v-model:value="formValues.icon" />
          </a-form-item>
          <a-form-item label="菜单地址">
            <a-input
              v-model:value="formValues.menuPath"
              :addon-before="`/admin${formValues.parent.path ?? ''}`"
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

<style lang="scss" scoped>
.menu-content {
  border-inline-end: 1px solid #f0f0f0;

  .ant-menu {
    border: none;
  }
}
</style>
