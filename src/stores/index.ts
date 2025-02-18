import { UserInfo } from '@/types/login'
import { MenuItem } from '@/types/menu'
import { defineStore } from 'pinia'

interface StoreState {
  count: number
  isMounted?: boolean
  menus: MenuItem[]
  flatMenus: MenuItem[]
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
        permNode: 0,
        icon: 'https://lq-oss2024.oss-cn-hangzhou.aliyuncs.com/icons/database.svg'
      },
    ],
    flatMenus: [
      {
        id: 999,
        menuName: '菜单设置',
        menuPath: '/menu',
        level: 1,
        permNode: 0,
        icon: 'https://lq-oss2024.oss-cn-hangzhou.aliyuncs.com/icons/database.svg'
      },
    ],
    userInfo: {},
  }),
  actions: {
    setIsMounted(isMounted: boolean) {
      this.isMounted = isMounted
    },
    setMenus({ routers, flatMenus }: { routers: MenuItem[]; flatMenus: MenuItem[] }) {
      this.menus = this.menus.concat(routers)
      this.flatMenus = this.flatMenus.concat(flatMenus)
    },
    setUser(user: UserInfo) {
      this.userInfo = user
    },
  },
})
