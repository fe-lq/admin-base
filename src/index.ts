import { createApp } from 'vue'
import App from './App.vue'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { GarfishInit } from './config'
import PageNotFound from '@/views/no-page/Index.vue'
import './assets/style.css'
import LoginView from '@/views/login/Index.vue'
import AdminView from '@/views/admin/Index.vue'
import Home from '@/views/home/Index.vue'

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
    path: '/admin',
    component: AdminView,
    children: [
      {
        path: 'home',
        component: Home,
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: PageNotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const render = () => {
  GarfishInit()
  const app = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')
}

render()
