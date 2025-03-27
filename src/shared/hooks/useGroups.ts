import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchGroups, fetchGroupDetail, getGroupList } from '@/shared/apis/groupApi'
import { SearchGroupParams } from '@/shared/types/group'

export const useInfiniteGroups = () => {
  return useInfiniteQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.groups.length > 0 ? allPages.length + 1 : undefined
    },
  })
}

export const useQueryGroups = (params: SearchGroupParams) => {
  return useInfiniteQuery({
    queryKey: ['groups', params],
    queryFn: ({ pageParam = 1 }) => getGroupList({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.groups.length > 0 ? allPages.length + 1 : undefined
    },
  })
}
export function useGroupDetail(groupId: string) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => fetchGroupDetail(groupId),
    enabled: !!groupId,
  })
}
