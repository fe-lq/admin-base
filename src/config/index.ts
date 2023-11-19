import Garfish from 'garfish'
// import Vue from 'vue'
import { Config } from './config'

export const GarfishInit = () => {
  // 共享依赖
  // Garfish.setExternal({
  //   vue: Vue,
  // })

  // 在路由跳转后，子应用挂载前触发
  Garfish.router.beforeEach((to, from, next) => {
    next()
  })

  // 在路由跳转后，子应用挂载后触发
  Garfish.router.afterEach((to, from, next) => {
    next()
  })

  try {
    console.log(document.querySelector('#subApp'))
    Garfish.run(Config)
  } catch (error) {
    console.log('错啦啦啦啦')
    console.log('garfish init error', error)
  }
}
