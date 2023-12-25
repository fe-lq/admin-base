export interface MenuItem {
  id: string
  name: string
  path: string
  perm: string
  icon?: string
  children?: MenuItem[]
}
