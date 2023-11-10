import { postRequest } from '@/http'

export const loginApi = postRequest<any, any>('/users/login')
