import { UserInfo } from '@/types/login'
import { MenuItem } from '@/types/menu'
import { defineStore } from 'pinia'

interface StoreState {
  count: number
  isMounted?: boolean
  menus: MenuItem[]
  userInfo: UserInfo
}

export const useBaseStore = defineStore('baseStore', {
  state: (): StoreState => ({
    count: 0,
    isMounted: undefined,
    menus: [
      {
        id: 999,
        menuName: '菜单设置',
        menuPath: '/menu',
        level: 1,
        permNode: '0',
      },
    ],
    userInfo: {},
  }),
  actions: {
    setIsMounted(isMounted: boolean) {
      this.isMounted = isMounted
    },
    setMenus(menus: MenuItem[]) {
      this.menus = menus
    },
    setUser(user: UserInfo) {
      this.userInfo = user
    },
  },
})
