'use client'

import Link from 'next/link'
import React from 'react'
import { navItems } from './Navbar'
import { usePathname } from 'next/navigation'
import { Button } from '@heroui/button'
import { signIn, signOut } from 'next-auth/react'
import { useAuth } from '@/shared/hooks/useAuth'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useTranslations } from 'next-intl'
import { MdLogin } from 'react-icons/md'

export default function NavbarMobile() {
  const pathname = usePathname()
  const { session } = useAuth()
  const navItemsToShow = session ? navItems : navItems.filter(item => item.path === '/')
  const t = useTranslations('MenuNavbar')

  return (
    <div className="flex h-max w-full justify-between rounded-lg border-gray-200 bg-white p-2 md:hidden">
      <nav className="flex flex-row gap-x-2">
        {navItemsToShow.map(item => (
          <Link
            key={item.path}
            className={`flex h-max w-max items-center gap-3 rounded-lg bg-primary/40 p-2 text-left text-primary transition-all duration-200 ${
              pathname === item.path ? 'bg-primary/40 font-semibold' : 'hover:bg-primary/40'
            }`}
            href={item.path}
          >
            {item.icon}
            <span className={`text-sm md:flex ${pathname === item.path ? 'flex' : 'hidden'}`}>
              {t(item.labelKey)}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex justify-end">
        {session ? (
          <Button
            isIconOnly
            className="flex items-center gap-2 rounded-lg bg-primary p-2 font-normal text-white hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <RiLogoutCircleRLine size={20} />
            <span className="hidden text-sm font-semibold md:flex">{t('logout')}</span>
          </Button>
        ) : (
          <Button
            isIconOnly
            className="flex items-center rounded-lg bg-primary font-normal text-white hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => signIn()}
          >
            <MdLogin size={20} />
            <span className="hidden text-sm font-semibold md:flex">{t('login')}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
