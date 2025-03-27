import apiClient from '@/shared/libs/axios'
import {
  PasswordUserResponse,
  ResetPasswordUser,
  SetPasswordUser,
  UpdatePassword,
  UpdateUserInfo,
  UpdateUserInfoResponse,
  User,
} from '@/shared/types/auth'

export const getUserInfo = async (): Promise<User> => {
  const response = await apiClient.get('/auth/user-info')
  return response.data
}

export const updateUserInfo = async (data: UpdateUserInfo): Promise<UpdateUserInfoResponse> => {
  const response = await apiClient.put('/auth/user-info', data)
  return response.data
}

export const updatePasswordUser = async (data: UpdatePassword): Promise<User> => {
  const response = await apiClient.put('auth/change-password', data)
  return response.data
}

export const resetPasswordUser = async (data: ResetPasswordUser): Promise<number> => {
  const response = await apiClient.put('/auth/reset-password', data)
  return response.status
}

export const verifyResetPassword = async (token: string): Promise<PasswordUserResponse> => {
  const response = await apiClient.get(`/auth/verify-reset-password-token`, {
    params: { token },
  })
  return response.data.id
}

export const setPasswordUser = async (data: SetPasswordUser): Promise<PasswordUserResponse> => {
  const response = await apiClient.put('auth/set-password', data)
  return response.data.id
}
