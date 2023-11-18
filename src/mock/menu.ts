import { Micros } from '@/config/micro'
import { Document, Location, Setting, House, Notebook } from '@element-plus/icons-vue'
import type { DefineComponent } from 'vue'

/** 路由配置项 */
interface Route {
  /** 菜单图标 */
  icon?: DefineComponent
  /** 路径 */
  path: string
  /** 菜单名称 */
  name: string
  /** 唯一值 */
  id: string
  /** 权限节点 */
  perm?: string | string[]
  /** 子菜单配置 */
  children?: Route[]
}

const routers: Route[] = [
  {
    icon: House,
    path: '/home',
    name: '首页',
    id: '999',
  },
  {
    icon: Document,
    path: `/${Micros.ARCHIVES}`,
    name: '档案管理',
    id: '1',
    children: [
      {
        path: '/users',
        name: '用户管理',
        id: '1-1',
      },
      {
        path: '/permission',
        name: '权限管理',
        id: '1-2',
      },
      {
        path: '/customer',
        name: '客户管理',
        id: '1-3',
      },
    ],
  },
  {
    icon: Location,
    path: `/${Micros.GOODS}`,
    name: '商品管理',
    id: '2',
    children: [
      {
        path: '/information',
        name: '商品信息',
        id: '2-1',
      },
      {
        path: '/category',
        name: '商品分类',
        id: '2-2',
      },
    ],
  },
  {
    icon: Notebook,
    path: '/online',
    name: '线上档案',
    id: '3',
    children: [
      {
        path: '/order',
        name: '订单管理',
        id: '3-1',
      },
      {
        path: '/sold',
        name: '线上商品',
        id: '3-2',
      },
    ],
  },
  {
    icon: Setting,
    path: '/menu',
    name: '菜单管理',
    id: '55',
  },
]

/**
 *
 * @param routers 路由配置
 * @param baseUrl 基本路由
 * @returns 拼接完整路由地址的配置
 * TODO: 可以关联权限节点
 */
const transformRouters = (routers: Route[], baseUrl: string = '/admin') => {
  for (const route of routers) {
    route.path = `${baseUrl}${route.path}`
    if (route.children?.length) {
      route.children = transformRouters(route.children, route.path)
    }
  }
  return routers
}

/** 菜单路由配置 */
export const menuConfig = transformRouters(routers)
