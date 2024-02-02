import axios, { type AxiosRequestConfig } from 'axios'

type MethodKey = 'post' | 'get' | 'delete' | 'put' | 'patch'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 5000,
})

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (resolve) => {
    // 只要拥有有新token就重新设置
    if (resolve.headers['refresh-token']) {
      localStorage.setItem('token', resolve.headers['refresh-token'])
    }
    return resolve.data
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.replace('/login')
    }
    return Promise.reject(error.response?.data)
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
