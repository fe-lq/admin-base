import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './routers'
import { GarfishInit } from './config'
import 'element-plus/dist/index.css'
import './assets/style.css'

const render = () => {
  GarfishInit()
  const app = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')
}

render()
