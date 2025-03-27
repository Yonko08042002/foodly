import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserInfo, updateUserInfo } from '@/shared/apis/auth'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
  })
}

export const useUserMutation = (
  message: string,
  reset: () => void,
  onOpenChange: (open: boolean) => void,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
      toast.success(message)
      reset()
      onOpenChange(false)
    },
  })
}

export function useAuth() {
  const { data: session, status } = useSession()
  console.log('hello', session)
  return { session, status }
}
