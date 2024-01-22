import { postRequest } from '@/http'
import { LoginParams, UserInfo } from '@/types/login'

export const loginApi = postRequest<{ token: string }, LoginParams>('/users/login')
export const registerApi = postRequest<unknown, UserInfo>('/users/register')
