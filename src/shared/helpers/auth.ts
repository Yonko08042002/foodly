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
  console.log('credentials', credentials)
  try {
    const { data } = await apiClient.post('/auth/sign-in', credentials)
    console.log('data từ api', data)
    console.log('token từi api', data.access_token)
    if (data.access_token) {
      return {
        id: data.user_id,
        email: credentials.email,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        organizationId: data.organization_id,
        type: data.type,
        iat: data.iat,
        exp: data.exp,
      }
    }

    return null
  } catch (error) {
    console.log('error', error)
    if (error instanceof Error) {
      throw new Error(error.message || 'Login failed')
    }
    return null
  }
}
