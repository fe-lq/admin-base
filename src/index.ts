import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { GarfishInit } from './config'
import PageNotFound from './components/no-page/PageNotFound.vue'
import './assets/style.css'

const routes = [
  {
    path: '/',
    component: App,
  },
  { path: '/archives', component: App },
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
