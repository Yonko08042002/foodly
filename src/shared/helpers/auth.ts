import apiClient from '@/shared/libs/axios'

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
  } catch (error) {
    console.log('error:', error)
    if (error instanceof Error) {
      throw new Error(error.message || 'Login failed')
    }
    return null
  }
}
