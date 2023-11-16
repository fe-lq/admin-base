<script lang="ts">
import { Micros } from '@/config/micro'
import { Document, Location, Setting, House } from '@element-plus/icons-vue'
import type { DefineComponent } from 'vue'
interface MenuItem {
  icon?: DefineComponent
  url: string
  name: string
  id: string
  children?: MenuItem[]
}
export const menuConfig: MenuItem[] = [
  {
    icon: House,
    url: '/home',
    name: '首页',
    id: '999',
  },
  {
    icon: Document,
    url: `/${Micros.ARCHIVES}`,
    name: '档案管理',
    id: '1',
    children: [
      {
        url: '/users',
        name: '用户管理',
        id: '1-1',
      },
      {
        url: '/permission',
        name: '权限管理',
        id: '1-2',
      },
      {
        url: '/client',
        name: '客户管理',
        id: '1-3',
      },
    ],
  },
  {
    icon: Location,
    url: `/${Micros.GOODS}`,
    name: '商品管理',
    id: '2',
    children: [
      {
        url: '/',
        name: '商品信息',
        id: '2-1',
      },
      {
        url: '/',
        name: '商品分类',
        id: '2-2',
      },
    ],
  },
  {
    icon: Setting,
    url: '/app',
    name: '线上档案',
    id: '3',
    children: [
      {
        url: '/order',
        name: '订单管理',
        id: '3-1',
      },
      {
        url: '/sale-goods',
        name: '线上商品',
        id: '2-3',
      },
    ],
  },
]
</script>
