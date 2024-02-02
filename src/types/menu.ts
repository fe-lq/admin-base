export interface MenuItem {
  parentId?: number
  id: number
  /** 菜单层级 */
  level: number
  /** 菜单名称 */
  menuName: string
  /** 路径 */
  menuPath: string
  permNode: string
  /** 菜单图标 */
  icon?: string
  /** 子菜单配置 */
  children?: MenuItem[]
}

export interface IconOption {
  path: string
  label: string
}

export interface MenuForm {
  id?: number
  menuName?: string
  permNode?: string
  icon?: string
  menuPath?: string
  level?: number
  parent: {
    name: string
    id?: number
    path?: string
  }
}

export enum MenuAction {
  ADD,
  EDIT,
  DELETE,
  VIEW,
}

export interface ProvideValues {
  action: (type: MenuAction, values?: MenuItem) => void
}
