export interface MenuItem {
  parentId?: number
  id: number
  level: number
  menuName: string
  menuPath: string
  permNode: string
  icon?: string
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
