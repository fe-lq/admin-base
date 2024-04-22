import { SECRET_KEY } from '@/constants'
import Crypto from 'crypto-js'
import { MenuItem } from '@/types/menu'

/**
 *  查找父级菜单用于回显
 * @param list 菜单列表
 * @param id 菜单id
 * @returns 菜单项
 */
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

/**
 * 加密密码
 * @param psw 明文密码
 * @returns 加密密码
 */
export const genEncryptPsw = (psw: string): string => Crypto.AES.encrypt(psw, SECRET_KEY).toString()

/**
 *  把菜单拼接父级路径之后返回
 * @param routers 路由配置
 * @param baseUrl 基本路由
 * @returns routers 拼接完整路由地址的菜单数据， menusFlat 扁平化菜单数据
 * TODO: 可以关联权限节点
 */
export const transformRouters = (routers: MenuItem[], baseUrl: string = '') => {
  // 扁平化菜单数据
  const flatMenus: MenuItem[] = []
  for (const route of routers) {
    route.menuPath = `${baseUrl}${route.menuPath}`
    flatMenus.push(route)
    if (route.children?.length) {
      const { routers, flatMenus: _flatMenus } = transformRouters(route.children, route.menuPath)
      route.children = routers
      flatMenus.push(..._flatMenus)
    }
  }

  // 两种数据类型放在一个方法中处理为了减少遍历
  return {
    routers,
    flatMenus,
  }
}
