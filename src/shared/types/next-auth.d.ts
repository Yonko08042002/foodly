import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken: string
      refreshToken: string
      organizationId: string
      type: string
      iat: number
      exp: number
    } & DefaultSession['user']
  }

  interface User {
    id: string
    accessToken: string
    refreshToken: string
    organizationId: string
    type: string
    iat: number
    exp: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    accessToken: string
    refreshToken: string
    organizationId: string
    type: string
    iat: number
    exp: number
  }
}
