import apiClient from '@/shared/libs/axios'
import axios, { AxiosError } from 'axios'

export interface RegisterCredentials {
  email: string
  password: string
  confirm_password: string
  display_name: string
  organization_code: string
}
export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    const { data } = await apiClient.post('/auth/sign-up', credentials)

    if (data.access_token) {
      return {
        id: data.user_id,
        email: credentials.email,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }
    }
    return null
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Registration failed')
    }
    return null
  }
}

export interface LoginCredentials {
  email: string
  password: string
  organization_code: string
}
export const loginUser = async (credentials: LoginCredentials) => {
  'use client'
  console.log('next Auth secret', process.env.NEXTAUTH_SECRET)
  console.log('Next auth url', process.env.NEXT_PUBLIC_APP_URL)
  console.log('api url', process.env.APP_API_BASE_URL)
  try {
    const response = await axios.post(
      'https://uittraining-api.cloud.runsystem.site/api/auth/sign-in',
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          Origin: process.env.NEXT_PUBLIC_APP_URL,
          Referer: process.env.NEXT_PUBLIC_APP_URL,
        },
      },
    )

    console.log('Phản hồi từ API:', response.data)

    const data = response.data
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
    console.log(error)
    if (error instanceof AxiosError) {
      console.error('Lỗi đăng nhập từ API:', error.response?.data && error.message && error)
    }
    return null
  }
}
export interface LoginCredentials {
  email: string
  password: string
  organization_code: string
}

// export const loginUser = async (credentials: LoginCredentials) => {
//   console.log('🔍 Debug: Hardcoded login function called')
//   console.log('Received credentials:', credentials)

//   // 🛠 Hard-code thông tin đăng nhập hợp lệ
//   const validEmail = 'test@example.com'
//   const validPassword = 'Password@123'
//   const validOrganizationCode = 'GMODN'

//   if (
//     credentials.email !== validEmail ||
//     credentials.password !== validPassword ||
//     credentials.organization_code !== validOrganizationCode
//   ) {
//     console.log('❌ Sai thông tin đăng nhập!')
//     return null
//   }

//   // ✅ Trả về user mock nếu đúng thông tin đăng nhập
//   const user = {
//     user_id: '123456',
//     access_token: 'fake_access_token_123',
//     refresh_token: 'fake_refresh_token_456',
//     organization_id: 'org_789',
//     type: 'admin',
//     iat: Math.floor(Date.now() / 1000),
//     exp: Math.floor(Date.now() / 1000) + 60 * 60, // Hết hạn sau 1 giờ
//   }

//   console.log('✅ Đăng nhập thành công:', user)
//   return user
// }
