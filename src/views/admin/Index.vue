<script setup lang="ts">
import LayoutHeader from '@/layout/Header.vue'
import LayoutMenu from '@/layout/Menu.vue'
import LayoutContent from '@/layout/Content.vue'
import { onBeforeMount, ref } from 'vue'
import { getUserInfoApi } from '@/api/user'
import { useBaseStore } from '@/stores'
import { transformRouters } from '@/utils'
import { message } from 'ant-design-vue'

const baseStore = useBaseStore()
const loading = ref<boolean>(false)

onBeforeMount(async () => {
  try {
    loading.value = true
    const {
      data: { user, menuList },
    } = await getUserInfoApi()
    baseStore.setUser(user)
    baseStore.setMenus(transformRouters(menuList))
  } catch (error: any) {
    message.error(error.message)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <a-spin :spinning="loading">
    <a-layout class="admin-layout">
      <LayoutHeader />
      <a-layout class="admin-container">
        <LayoutMenu />
        <LayoutContent />
        <RouterView name="notFound" />
      </a-layout>
    </a-layout>
  </a-spin>
</template>

<style scoped lang="scss">
.admin-layout {
  height: 100%;
}
.admin-container {
  height: calc(100% - 60px);
}
</style>
