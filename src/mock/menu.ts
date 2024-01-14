import { Micros } from '@/config/micro'
import { HomeOutlined, WalletOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons-vue'
import type { FunctionalComponent } from 'vue'

/** 路由配置项 */
interface Route {
  /** 菜单图标 */
  icon?: FunctionalComponent
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
    icon: HomeOutlined,
    path: '/home',
    name: '首页',
    id: '999',
  },
  {
    icon: WalletOutlined,
    path: Micros.ARCHIVES,
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
    icon: AppstoreOutlined,
    path: Micros.GOODS,
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
    icon: MenuOutlined,
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
const transformRouters = (routers: Route[], baseUrl: string = '') => {
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
