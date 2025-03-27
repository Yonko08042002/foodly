import { Suspense } from 'react'
import LoginForm from '@/shared/presentation/auth/container/LoginForm'

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
