'use client'

import React from 'react'

import { HeroUIProvider } from '@heroui/react'
export function HeroProvider({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>
}
