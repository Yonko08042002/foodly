import { Circle } from 'lucide-react'
import React from 'react'

interface StatusChipProps {
  status: string
  className?: string
}

export default function StatusChip({ status, className }: StatusChipProps) {
  const chipColor = status === 'INIT' ? 'bg-[#03FE03]' : 'bg-gray-500'

  return (
    <div
      className={`${className} ${chipColor} flex items-center gap-1 rounded-full p-[2px] text-white`}
    >
      <Circle size={20} color="#ffffff" strokeWidth={5} />
    </div>
  )
}
