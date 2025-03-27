import apiClient from '@/shared/libs/axios'
import { AxiosError } from 'axios'

export interface LoginCredentials {
  email: string
  password: string
  organization_code: string
}
export const loginUser = async (credentials: LoginCredentials) => {
  console.log('next Auth secret', process.env.NEXTAUTH_SECRET)
  console.log('Next auth url', process.env.NEXTAUTH_URL)
  console.log('api url', process.env.APP_API_BASE_URL)
  try {
    const { data } = await apiClient.post('/auth/sign-in', credentials)
    console.log('data từ api', data)
    console.log('token từi api', data.access_token)
    if (data.access_token) {
      return {
        user_id: data.user_id,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        organization_id: data.organization_id,
        type: data.type,
        iat: data.iat,
        exp: data.exp,
      }
    }

    return null
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Lỗi đăng nhập từ API:', error.response?.data || error.message)
    } else if (error instanceof Error) {
      console.error('Lỗi hệ thống:', error.message)
    } else {
      console.error('Lỗi không xác định:', error)
    }
  }
}
