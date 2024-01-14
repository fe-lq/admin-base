import { defineConfig } from 'vite'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    vueJsx(),
    // 强大的tools，Chrome插件待开发中，先用vite插件
    VueDevTools(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [AntDesignVueResolver({ resolveIcons: true, importStyle: false })],
    }),
  ],
})
