import { Avatar } from '@heroui/react'
import { configs } from '@/shared/constant'
import { useAuth } from '@/shared/hooks/useAuth'

export default function UserMenu() {
  const { session } = useAuth()

  if (!session) return null

  return (
    <div className="hidden items-center justify-between gap-2 md:flex">
      <p className="font-semibold text-white">{session.user?.email}</p>
      <Avatar
        className="border-[1px] border-primary"
        src={session.user?.image || configs.background.src}
      />
    </div>
  )
}
