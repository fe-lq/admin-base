import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './routers'
import { GarfishInit } from './config'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import './assets/styles/index.css'
import { useBaseStore } from './stores'

const render = () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(ElementPlus)
  GarfishInit()
  app.mount('#app')
}

render()
