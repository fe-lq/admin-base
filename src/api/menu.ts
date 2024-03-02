import { postRequest, getRequest, http } from '@fe-lq/micro-kit'
import { IconOption, MenuItem } from '@/types/menu'
/**
 * 后续优化
 */
http.defaults.baseURL = import.meta.env.VITE_APP_BASE

export namespace MenuApi {
  export namespace Request {
    export type Menu = MenuItem

    export interface Icon {
      filePath: string
    }
  }
  export namespace Response {
    export type Menu = MenuItem[]

    export type Icon = IconOption[]
  }
}

export const getMenuIcons = getRequest<MenuApi.Response.Icon>('/menu/icons')
export const deleteMenuIcon = postRequest<unknown, MenuApi.Request.Icon>('/menu/icon/delete')
export const addMenu = postRequest<unknown, Omit<MenuApi.Request.Menu, 'id'>>('/menu/add')
export const deleteMenu = getRequest<unknown, Pick<MenuApi.Request.Menu, 'id'>>('/menu/delete')
export const updateMenu = postRequest<unknown, MenuApi.Request.Menu>('/menu/update')
export const getMenuList = postRequest<MenuApi.Response.Menu>('/menu/list')
export const updateMenuSort = postRequest<unknown, MenuApi.Response.Menu>('/menu/updateSort')
