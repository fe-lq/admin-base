import { getRequest, postRequest } from '@/http'
import { LoginParams, UserInfo } from '@/types/login'
import { MenuItem } from '@/types/menu'

export const loginApi = postRequest<{ token: string; user: UserInfo }, LoginParams>('/users/login')
export const registerApi = postRequest<unknown, UserInfo>('/users/register')
export const getUserInfoApi = getRequest<{ user: UserInfo; menuList: MenuItem[] }>('/users/info')
