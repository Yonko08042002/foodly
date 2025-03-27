import { Suspense } from 'react'
import ResetPassword from '@/shared/presentation/auth/container/ResetPassword'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <ResetPassword />
    </Suspense>
  )
}
