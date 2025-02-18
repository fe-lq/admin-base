export interface LoginParams {
  phone: string
  password: string
}

export interface UserInfo {
  userName?: string
  phone?: string
  email?: string
  password?: string
  role?: string
  status?: boolean
}
