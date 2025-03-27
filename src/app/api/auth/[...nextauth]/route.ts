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
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
