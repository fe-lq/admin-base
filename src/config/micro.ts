import GarfishInstance from 'garfish'

export enum Micros {
  ARCHIVES = '/archives',
  GOODS = '/goods',
}

const portMap: Record<Micros, number> = {
  [Micros.ARCHIVES]: 8090,
  [Micros.GOODS]: 8091,
}

type MicroList = NonNullable<NonNullable<Parameters<typeof GarfishInstance.run>[0]>['apps']>

const getProxyHost = (appName: Micros) => `http://localhost:${portMap[appName]}`

export const microApps: MicroList = [
  {
    name: '档案管理',
    activeWhen: Micros.ARCHIVES,
    sandbox: false,
    entry: getProxyHost(Micros.ARCHIVES),
  },
  {
    name: '商品管理',
    activeWhen: Micros.GOODS,
    sandbox: {
      // 开启严格隔离模式，防止ant design部分组件样式不生效
      strictIsolation: true,
    },
    entry: getProxyHost(Micros.GOODS),
  },
]
