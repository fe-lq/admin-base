import GarfishInstance from 'garfish'

export enum Micros {
  ARCHIVES = 'archives',
  USERS = 'users',
}

const portMap: Record<Micros, number> = {
  [Micros.ARCHIVES]: 8090,
  [Micros.USERS]: 8091,
}
type MicroList = NonNullable<Parameters<typeof GarfishInstance.run>[0]>['apps']

const getProxyHost = (appName: Micros) => `http://localhost:${portMap[appName]}`

export const microApps: MicroList = [
  {
    name: '档案管理',
    activeWhen: '/archives',
    entry: getProxyHost(Micros.ARCHIVES),
  },
  {
    name: '用户',
    activeWhen: '/users',
    entry: getProxyHost(Micros.USERS),
  },
]
