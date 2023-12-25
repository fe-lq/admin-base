import { postRequest } from '@/http'

export const deleteMenuIcon = postRequest<{ filePath: string }, string>('/files/icon/delete')
