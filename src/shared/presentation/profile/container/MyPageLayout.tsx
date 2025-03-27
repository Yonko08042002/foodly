'use client'
import React from 'react'
import CardUser from '@/shared/presentation/profile/components/CardUser'
import CardPayment from '@/shared/presentation/profile/components/CardPayment'
import CardChart from '@/shared/presentation/profile/components/CardChart'
import { useUserInfo } from '@/shared/hooks/useAuth'

export default function MyPageLayout() {
  const { data: user } = useUserInfo()
  return (
    <div className="container flex flex-col gap-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row 2xl:w-10/12">
        <div className="w-full lg:w-1/2 2xl:w-1/2">
          <CardUser data={user} />
        </div>
        <div className="w-full flex-1 2xl:w-2/5">
          <CardPayment data={user?.payment_setting} />
        </div>
      </div>

      <div className="pb-20">
        {' '}
        <CardChart />
      </div>
    </div>
  )
}
