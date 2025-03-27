'use client'
import { configs } from '@/shared/constant'
import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import Header from '@/shared/components/organisms/Header'
import { Button } from '@heroui/react'
import Navbar from '@/shared/components/molecules/Navbar'
import NavbarMobile from '@/shared/components/molecules/NavbarMobile'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-screen w-full flex-col gap-8 overflow-hidden bg-cover bg-center bg-no-repeat p-4 md:bg-cover md:py-8 lg:px-36"
      style={{ backgroundImage: `url(${configs.background.src})` }}
    >
      <Header />

      <div className="flex flex-col gap-14 md:h-auto md:flex-row">
        <Navbar />

        <div className="flex-1">{children}</div>

        <div className="fixed bottom-0 left-0 z-50 w-full md:hidden">
          <div className="fixed bottom-22 right-4 z-50">
            <Button
              startContent={<Plus strokeWidth={1} />}
              className="flex w-max items-center justify-end gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-normal text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Tạo nhóm
            </Button>
          </div>
          <div className="px-4 py-4">
            <NavbarMobile />
          </div>
        </div>
      </div>
    </div>
  )
}
