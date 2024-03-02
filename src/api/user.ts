import { postRequest, getRequest, http } from '@fe-lq/micro-kit'
import { LoginParams, UserInfo } from '@/types/login'
import { MenuItem } from '@/types/menu'
http.defaults.baseURL = import.meta.env.VITE_APP_BASE
export const loginApi = postRequest<{ token: string; user: UserInfo }, LoginParams>('/users/login')

export const registerApi = postRequest<unknown, UserInfo>('/users/register')
export const getUserInfoApi = getRequest<{ user: UserInfo; menuList: MenuItem[] }>('/users/info')
export const loginOutApi = getRequest<{ user: UserInfo; menuList: MenuItem[] }>('/users/logout')
