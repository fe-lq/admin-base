import GarfishInstance from 'garfish'

const portMap: Record<string, number> = {
  goods: 8090,
  users: 8091,
}
type MicroList = NonNullable<Parameters<typeof GarfishInstance.run>[0]>['apps']

const getProxyHost = (appName: string) => `http://localhost:${portMap[appName]}`

export const microApps: MicroList = [
  {
    name: '商品',
    activeWhen: '/goods',
    entry: getProxyHost('goods'),
  },
  {
    name: '用户',
    activeWhen: '/users',
    entry: getProxyHost('users'),
  },
]
