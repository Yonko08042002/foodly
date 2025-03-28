//axios
import axios from 'axios'

import { toast } from 'sonner'
import { CODE_STATUS, MESSAGE_STATUS } from '@/shared/constant'
import { getSession } from 'next-auth/react'

const apiClient = axios.create({
  baseURL: process.env.APP_API_BASE_URL || 'https://uittraining-api.cloud.runsystem.site/api/',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    Origin: process.env.NEXT_PUBLIC_APP_URL,
    Referer: process.env.NEXT_PUBLIC_APP_URL,
  },
})
apiClient.interceptors.request.use(async config => {
  const session = await getSession()
  if (session?.user?.access_token) {
    config.headers.Authorization = `Bearer ${session.user.access_token}`
  }
  return config
})
const errorResponse = {
  [CODE_STATUS.BAD_REQUEST]: `${MESSAGE_STATUS.INVALID_CREDENTIALS}`,
  [CODE_STATUS.UNAUTHORIZED]: `${MESSAGE_STATUS.ACCESS_DENIED}`,
  [CODE_STATUS.FORBIDDEN]: `${MESSAGE_STATUS.ACCESS_DENIED}`,
  [CODE_STATUS.CONFLICT]: `${MESSAGE_STATUS.CONFLICT}`,
  [CODE_STATUS.NOT_FOUND]: `${MESSAGE_STATUS.NOT_FOUND}`,
  [CODE_STATUS.INTERNAL_SERVER_ERROR]: `${MESSAGE_STATUS.INTERNAL_SERVER_ERROR}`,
}

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status
      const message = errorResponse[status] || `Lỗi không xác định: ${error.message}`
      toast.error(message)
    } else {
      toast.error(MESSAGE_STATUS.INTERNAL_SERVER_ERROR)
    }

    return Promise.reject(error)
  },
)

export default apiClient
