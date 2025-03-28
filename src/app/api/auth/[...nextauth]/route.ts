import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginCredentials, loginUser } from '@/shared/helpers/auth'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
        organization_code: { label: 'Organization Code', type: 'text' },
      },

      async authorize(credentials, req) {
        console.log('Headers:', req?.headers)
        console.log('Received credentials:', credentials)
        try {
          if (!credentials) {
            throw new Error('Missing credentials')
          }
          const user = await loginUser(credentials as LoginCredentials)
          console.log('User after login:', user)
          if (user) {
            return {
              id: user.user_id,
              user_id: user.user_id,
              access_token: user.access_token,
              refresh_token: user.refresh_token,
              organization_id: user.organization_id,
              type: user.type,
              iat: user.iat,
              exp: user.exp,
            }
          }
          return null
        } catch (error) {
          console.log('Lỗi gì gì đây:', error)
          if (error instanceof Error) {
            throw new Error(error.message || 'Login failed')
          }
          throw new Error('Login failed')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id
        token.access_token = user.access_token
        token.refresh_token = user.refresh_token
        token.organization_id = user.organization_id
        token.type = user.type
        token.iat = user.iat
        token.exp = user.exp
      }
      console.log('JWT Token:', token)
      return token
    },
    async session({ session, token }) {
      session.user.user_id = token.user_id
      session.user.access_token = token.access_token
      session.user.refresh_token = token.refresh_token
      session.user.organization_id = token.organization_id
      session.user.type = token.type
      session.user.iat = token.iat
      session.user.exp = token.exp
      console.log('Session:', session)
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
