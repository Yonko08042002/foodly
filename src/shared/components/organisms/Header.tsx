import React from 'react'
import UserMenu from '@/shared/components/molecules/UserMenu'
import { configs } from '@/shared/constant'
import LanguageSelector from '../atoms/LanguageSelector'

export default function Header() {
  return (
    <div className="flex items-center justify-center md:justify-between">
      <div className="flex w-max items-center justify-center gap-2 rounded-full bg-primary/70 p-2">
        <div className="size-8 rounded-full bg-primary" />
        <h1 className="text-lg font-bold uppercase text-white">{configs.name_local}</h1>
      </div>
      <div className="flex gap-1">
        <LanguageSelector />

        <UserMenu />
      </div>
    </div>
  )
}
