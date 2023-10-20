import axios, { type AxiosRequestConfig } from 'axios'

type MethodKey = 'post' | 'get' | 'delete' | 'put' | 'patch'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE,
  timeout: 5000,
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
  return <R, P>(url: string, params: R, config: AxiosRequestConfig) => {
    const paramKey = type === 'get' ? 'params' : 'data'
    return http.request({
      method: type,
      url,
      [paramKey]: params,
      ...config,
    }) as Promise<P>
  }
}

export default {
  postRequest: createRequest('post'),
  getRequest: createRequest('get'),
  deleteRequest: createRequest('delete'),
  putRequest: createRequest('put'),
  patchRequest: createRequest('patch'),
}
