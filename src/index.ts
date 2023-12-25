import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import { GarfishInit } from './config'
import { createPinia } from 'pinia'
import './assets/styles/index.css'
// import { useBaseStore } from './stores'

const render = () => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  GarfishInit()
  app.mount('#app')
}

render()
