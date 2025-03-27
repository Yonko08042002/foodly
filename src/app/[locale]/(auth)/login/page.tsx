import { Suspense } from 'react'
import LoginForm from '@/shared/presentation/auth/container/LoginForm'

export default function Login() {
  console.log('secret', process.env.NEXTAUTH_SECRET)
  console.log('secret', process.env.NEXTAUTH_URL)
  console.log('secret', process.env.APP_API_BASE_URL)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
