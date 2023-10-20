import GarfishInstance from 'garfish'
import { microApps } from './micro'

type ConfigOptions = NonNullable<Parameters<typeof GarfishInstance.run>[0]>
export const Config: ConfigOptions = {
  apps: microApps,
  domGetter: '#subApp',
  basename: 'base',
  // 禁用子应用的资源预加载
  disablePreloadApp: true,
  // 沙箱, 如果子应用都是vite项目可以设置全局的sandbox为false
  sandbox: false,
  props: {
    store: { userInfo: { name: 'lq' } },
  },
  // 共享window下的全局变量
  protectVariable: ['Permission'],
  beforeLoad(appInfo) {
    console.log('子应用开始加载', appInfo.name)
  },
  afterLoad(appInfo) {
    console.log('子应用加载完成', appInfo.name)
  },
}
