import GarfishInstance from 'garfish'
import { microApps } from './micro'

type ConfigOptions = NonNullable<Parameters<typeof GarfishInstance.run>[0]>
export const Config: ConfigOptions = {
  apps: microApps,
  domGetter: '#subApp',
  basename: '/admin',
  // 禁用子应用的资源预加载
  disablePreloadApp: false,
  // 沙箱, 如果子应用都是vite项目可以设置全局的sandbox为false
  sandbox: false,
  props: {
    store: { userInfo: { name: 'lq' } },
  },
  // 共享window下的全局变量
  protectVariable: ['Permission'],
  onNotMatchRouter(path) {
    console.log('未匹配到子应用', path)
  },
  beforeLoad(appInfo) {
    console.log('子应用开始加载', appInfo)
  },

  errorLoadApp(error, appInfo) {
    console.log('子应用加载异常', appInfo.name)
    console.error(error)
  },

  afterLoad(appInfo) {
    console.log('子应用加载完成', appInfo)
  },
  beforeMount(appInfo) {
    console.log('子应用开始渲染', appInfo)
  },
  afterMount(appInfo) {
    console.log('子应用渲染结束', appInfo)
  },
  afterUnmount(error, appInfo) {
    console.log('子应用销毁异常', appInfo)
    console.error(error)
  },
  errorUnmountApp(error, appInfo) {
    console.log('子应用销毁异常', appInfo)
    console.error(error)
  },
  errorMountApp(error, appInfo) {
    console.log('子应用渲染异常', appInfo)
    console.error(error)
  },
}
