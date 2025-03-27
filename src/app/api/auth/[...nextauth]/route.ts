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
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error('Missing credentials')
          }
          console.log('secret1', process.env.NEXTAUTH_SECRET)
          console.log('secret1', process.env.NEXTAUTH_URL)
          console.log('secret1', process.env.APP_API_BASE_URL)
          return await loginUser(credentials as LoginCredentials)
        } catch (error) {
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
        token.id = user.id
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.organizationId = user.organizationId
        token.type = user.type
        token.iat = user.iat
        token.exp = user.exp
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.organizationId = token.organizationId
      session.user.type = token.type
      session.user.iat = token.iat
      session.user.exp = token.exp

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
