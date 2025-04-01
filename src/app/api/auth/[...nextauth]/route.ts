import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
        organization_code: { label: 'Organization Code', type: 'text' },
        access_token: { label: 'Access Token', type: 'text' },
        refresh_token: { label: 'Refresh Token', type: 'text' },
        user_id: { label: 'User ID', type: 'text' },
        organization_id: { label: 'Organization ID', type: 'text' },
        type: { label: 'Type', type: 'text' },
        iat: { label: 'IAT', type: 'text' },
        exp: { label: 'EXP', type: 'text' },
      },

      async authorize(credentials) {
        console.log('Received credentials:', credentials)

        if (!credentials?.access_token) {
          throw new Error('Login failed: No access token')
        }

        return {
          id: credentials.user_id,
          user_id: credentials.user_id,
          access_token: credentials.access_token,
          refresh_token: credentials.refresh_token,
          organization_id: credentials.organization_id,
          type: credentials.type,
          iat: Number(credentials.iat),
          exp: Number(credentials.exp),
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
      return token
    },
    async session({ session, token }) {
      session.user = {
        user_id: token.user_id,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        organization_id: token.organization_id,
        type: token.type,
        iat: token.iat,
        exp: token.exp,
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
