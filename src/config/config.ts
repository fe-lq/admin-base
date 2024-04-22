import GarfishInstance from 'garfish'
import { microApps } from './micro'
import { useBaseStore } from '@/stores'

type ConfigOptions = NonNullable<Parameters<typeof GarfishInstance.run>[0]>

export const basename = '/admin'

export const defaultConfig: ConfigOptions = {
  apps: microApps,
  domGetter: '#subApp',
  basename,
  // 禁用子应用的资源预加载
  disablePreloadApp: false,
  // 沙箱, 如果子应用都是vite项目可以设置全局的sandbox为false
  // sandbox: false,
  autoRefreshApp: true,
  // 共享window下的全局变量
  protectVariable: ['Permission'],

  beforeLoad() {
    const baseStore = useBaseStore()
    baseStore.setIsMounted(false)
  },
  errorLoadApp(error, appInfo) {
    console.error({ [`加载异常-${appInfo.name}`]: error })
    GarfishInstance.router.push({ path: `error` })
  },

  // 在子应用渲染后触发该函数
  afterMount() {
    const baseStore = useBaseStore()
    baseStore.setIsMounted(true)
    // 使用Garfish.channel实现通信
    // 触发子应用的baseStore事件，传递数据
    GarfishInstance.channel.emit('baseStore', baseStore.userInfo)
  },

  errorMountApp(error, appInfo) {
    console.error({ [`渲染异常-${appInfo.name}`]: error })
  },
}

export const getConfig = (config?: ConfigOptions) => {
  return Object.assign({}, defaultConfig, config)
}
