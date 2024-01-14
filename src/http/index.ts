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
    return resolve.data
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)
const createRequest = (type: MethodKey) => {
  /**
   *  泛型
   *  <响应, 请求>
   */
  return <R = unknown, P = unknown>(url: string) => {
    const paramKey = type === 'get' ? 'params' : 'data'
    return async (params?: P, config?: AxiosRequestConfig) => {
      return http.request<
        R,
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
