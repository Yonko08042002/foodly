'use client'

import { routing, usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import React, { useTransition } from 'react'
import { Button } from '@heroui/button'
import { TbLanguage } from 'react-icons/tb'

export default function LanguageSelector() {
  const t = useTranslations('LocaleSwitcher')
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onValueChange(value: (typeof routing.locales)[number]) {
    startTransition(() => {
      router.replace(pathname, { locale: value })
      router.refresh()
    })
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="flex items-center gap-2 rounded-lg bg-primary p-2 font-normal text-white hover:scale-[1.02] active:scale-[0.98]">
          <TbLanguage />
          {t('locale', { locale })}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Select language" selectionMode="single">
        {routing.locales.map(lang => (
          <DropdownItem
            key={lang}
            onClick={() => onValueChange(lang)}
            isDisabled={isPending}
            className={`flex items-center justify-between capitalize ${locale === lang ? 'font-semibold text-primary' : ''}`}
          >
            {t('locale', { locale: lang })}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
