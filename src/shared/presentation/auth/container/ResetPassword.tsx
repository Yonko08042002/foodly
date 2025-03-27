'use client'
import { verifyResetPassword } from '@/shared/apis/auth'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SetPasswordModal from '@/shared/presentation/auth/components/SetPasswordModal'
import ExpiredTokenModal from '@/shared/presentation/auth/components/ExpriedTokenModal'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const [isSetPasswordOpen, setIsSetPasswordOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(true)

  const { data, isError } = useQuery({
    queryKey: ['verifyToken', token],
    queryFn: () => verifyResetPassword(token),
    enabled: !!token,
    retry: false,
  })
  useEffect(() => {
    if (isError) {
      setIsSetPasswordOpen(false)
    }
  }, [isError])
  return (
    <div>
      {isError && <ExpiredTokenModal setIsOpen={setIsOpen} isOpen={isOpen} />}
      {data && isSetPasswordOpen && (
        <SetPasswordModal
          token={token}
          isOpen={isSetPasswordOpen}
          onOpenChange={setIsSetPasswordOpen}
        />
      )}
    </div>
  )
}
