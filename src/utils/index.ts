import { SECRET_KEY } from '@/constants'
import Crypto from 'crypto-js'
import { MenuItem } from '@/types/menu'
export const getMenuParent = (list: MenuItem[], id?: number): MenuItem | null => {
  if (!id) {
    return null
  }
  // 遍历列表查找父级
  for (const item of list) {
    // 判断当前项的ID是否等于目标ID
    if (item.id === id) {
      return item
    }
    // 递归调用自身，查找子级
    if (item.children) {
      const parent = getMenuParent(item.children, id)
      if (parent) {
        return parent
      }
    }
  }
  return null
}

export const genEncryptPsw = (psw: string): string => Crypto.AES.encrypt(psw, SECRET_KEY).toString()

/**
 *
 * @param routers 路由配置
 * @param baseUrl 基本路由
 * @returns 拼接完整路由地址的配置
 * TODO: 可以关联权限节点
 */
export const transformRouters = (routers: MenuItem[], baseUrl: string = '') => {
  for (const route of routers) {
    route.menuPath = `${baseUrl}${route.menuPath}`
    if (route.children?.length) {
      route.children = transformRouters(route.children, route.menuPath)
    }
  }
  return routers
}
