import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/Index.vue'
import AdminView from '@/views/admin/Index.vue'
import Home from '@/views/home/Index.vue'
import PageNotFound from '@/views/no-page/Index.vue'
import { Micros, microApps } from '@/config/micro'
import { basename } from '@/config/config'

const microList = Object.values(Micros)
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: basename,
    component: AdminView,
    redirect: `${basename}/home`,
    children: [
      // 基座自己的路由
      {
        path: 'home',
        components: {
          home: Home,
        },
      },
      {
        path: `archives/:url*`,
        components: {
          notFound: PageNotFound,
        },
      },
      // 匹配不到子应用的页面时走基座的路由用noPage页面兜底
      // ...microList.map((microPath) => ({
      //   path: `${basename}/:path*/:url*`,
      //   components: {
      //     notFound: PageNotFound,
      //   },
      // })),
    ],
  },
  // 子应用路由, 必须要加不然会直接匹配不到子应用的路由
  ...microList.map((microPath) => ({
    path: `${basename}${microPath}/:url*`,
    component: AdminView,
  })),
  { path: '/:pathMatch(.*)*', name: 'notFound', component: PageNotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
