'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import { Button } from '@heroui/button'
import { CreditCardIcon, List } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiHome6Line, RiLogoutCircleLine } from 'react-icons/ri'
import { CgUserList } from 'react-icons/cg'
import { signIn, signOut } from 'next-auth/react'
import { ROUTES } from '@/shared/constant'
import { useLocale, useTranslations } from 'next-intl'
import { MdLogin } from 'react-icons/md'
export interface NavItem {
  icon: React.ReactNode
  labelKey: string
  path: string
}

export const navItems: NavItem[] = [
  {
    icon: <RiHome6Line size={25} />,
    labelKey: 'home',
    path: ROUTES.HOME,
  },
  {
    icon: <CreditCardIcon />,
    labelKey: 'payment',
    path: ROUTES.PAYMENT,
  },
  {
    icon: <List />,
    labelKey: 'my_group',
    path: ROUTES.MY_GROUP,
  },
  {
    icon: <CgUserList size={25} />,
    labelKey: 'profile',
    path: ROUTES.PROFILE,
  },
]
export default function Navbar() {
  const pathname = usePathname()
  const { session } = useAuth()
  const locale = useLocale()
  const cleanPathname = pathname.replace(`/${locale}`, '') || '/'
  const t = useTranslations('MenuNavbar')

  const navItemsToShow = session ? navItems : navItems.filter(item => item.path === '/')
  console.log(session)
  return (
    <div className="hidden h-[60vh] flex-col justify-between rounded-lg border-gray-200 bg-white p-4 md:flex xl:w-1/5">
      <nav className="flex flex-row gap-x-2 md:flex-col md:space-y-4">
        {navItemsToShow.map(item => (
          <Link
            key={item.path}
            className={`flex h-max w-max items-center gap-3 rounded-lg bg-primary/40 p-2 text-left text-primary transition-all duration-200 md:w-full ${
              cleanPathname === item.path
                ? 'bg-primary/40 font-semibold'
                : 'hover:bg-primary/40 md:bg-transparent'
            }`}
            href={item.path}
          >
            {item.icon}
            <span className={`text-sm md:flex ${cleanPathname === item.path ? 'flex' : 'hidden'}`}>
              {t(item.labelKey)}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex justify-end">
        {session ? (
          <Button
            className="flex items-center gap-2 rounded-lg bg-primary p-2 font-normal text-white hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <RiLogoutCircleLine size={20} />
            <span className="hidden text-sm font-semibold md:flex"> {t('logout')}</span>
          </Button>
        ) : (
          <Button
            className="flex items-center gap-2 rounded-lg bg-primary p-2 font-normal text-white hover:scale-[1.02] active:scale-[0.98]"
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
