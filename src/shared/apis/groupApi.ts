import apiClient from '@/shared/libs/axios'
import { Group, SearchGroupParams, SearchGroupResponse } from '@/shared/types/group'
import axios from 'axios'

interface FetchGroupsParams {
  pageParam?: number
  size?: number
  sort?: string
  isOnline?: number
  isMine?: number
}

export const fetchGroups = async ({
  pageParam = 1,
  size = 6,
  sort = 'code:asc',
  isOnline = 0,
  isMine = 0,
}: FetchGroupsParams): Promise<{ groups: Group[]; total: number }> => {
  const { data } = await apiClient.get('/groups', {
    params: { page: pageParam, size, sort, is_online: isOnline, is_mine: isMine },
  })
  return data
}
// export const fetchGroups = async ({
//   pageParam = 1,
//   size = 6,
//   sort = 'code:asc',
//   isOnline = 0,
//   isMine = 0,
// }: FetchGroupsParams): Promise<{ groups: Group[]; total: number }> => {
//   const { data } = await axios.get('/api/group', {
//     params: { page: pageParam, size, sort, is_online: isOnline, is_mine: isMine },
//   })
//   console.log(data)
//   return data
// }

export const getGroupList = async (params: SearchGroupParams): Promise<SearchGroupResponse> => {
  const { data } = await apiClient.get('/groups', {
    params,
  })
  return data
}

export const fetchGroupDetail = async (groupId: string): Promise<Group> => {
  const { data } = await apiClient.get(`/groups/${groupId}`)
  return data
}
