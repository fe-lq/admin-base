import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 8080,
    headers: {
      // 允许跨域
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [vue(), vueJsx()],
})
