import React from 'react'

interface GroupBadgeProps {
  startIcon?: React.ReactNode | string
  description: string | number
  endIcon?: React.ReactNode | string
  className?: string
}

export default function Chip({ startIcon, description, endIcon, className }: GroupBadgeProps) {
  return (
    <div className={`flex items-center gap-1 rounded-full bg-white px-2 py-1 ${className}`}>
      {startIcon && <div className="text-sm font-semibold text-primary"> {startIcon}</div>}

      <p className="text-sm font-semibold text-black">{description}</p>

      {endIcon && <div className="text-sm font-semibold text-primary"> {endIcon}</div>}
    </div>
  )
}
