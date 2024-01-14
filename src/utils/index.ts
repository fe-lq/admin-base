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
