import Garfish from 'garfish'
// import Vue from 'vue'
import { getConfig } from './config'
import { useBaseStore } from '@/stores'

export const GarfishInit = () => {
  // 共享依赖
  // Garfish.setExternal({
  //   vue: Vue,
  // })

  // 在路由跳转后，子应用挂载前触发
  Garfish.router.beforeEach((to, from, next) => {
    const store = useBaseStore()
    if (store.menus.length === 0) {
      next()
    } else {
      const hasPerm = store.flatMenus.find((item) => item.menuPath === to.path)
      if (hasPerm) {
        next()
      }
      next({ url: 'error' })
    }
  })

  // 在路由跳转后，子应用挂载后触发
  Garfish.router.afterEach((to, from, next) => {
    next()
  })

  try {
    const config = getConfig()
    Garfish.run(config)
  } catch (error) {
    console.log('garfish init error', error)
  }
}
