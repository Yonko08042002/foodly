import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      user_id: string
      access_token: string
      refresh_token: string
      organization_id: string
      type: string
      iat: number
      exp: number
    } & DefaultSession['user']
  }

  interface User {
    user_id: string
    access_token: string
    refresh_token: string
    organization_id: string
    type: string
    iat: number
    exp: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user_id: string
    access_token: string
    refresh_token: string
    organization_id: string
    type: string
    iat: number
    exp: number
  }
}
