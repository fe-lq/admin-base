import axios, { type AxiosRequestConfig } from 'axios'

type MethodKey = 'post' | 'get' | 'delete' | 'put' | 'patch'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 5000,
  // 自动携带cookie
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (resolve) => {
    // 如要使用响应的code，就把code放在data中
    return resolve.data.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

const createRequest = (type: MethodKey) => {
  return <R, P>(url: string) => {
    const paramKey = type === 'get' ? 'params' : 'data'
    return async (params: R, config?: AxiosRequestConfig) => {
      return http.request<
        P,
        {
          code: number
          data: R
          message: string
        }
      >({
        method: type,
        url,
        [paramKey]: params,
        ...config,
      })
    }
  }
}

export const postRequest = createRequest('post')
export const getRequest = createRequest('get')
export const deleteRequest = createRequest('delete')
export const putRequest = createRequest('put')
export const patchRequest = createRequest('patch')
