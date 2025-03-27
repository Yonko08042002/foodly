import { useState, useEffect, useRef } from 'react'
import { SlidersHorizontal } from 'lucide-react'

interface FilterSearchProps {
  onFilterSearch?: (selected: boolean) => void
}

function FilterSearch({ onFilterSearch }: FilterSearchProps) {
  const [selected, setSelected] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleChange = (value: boolean) => {
    setSelected(value)
    setIsOpen(false)
    onFilterSearch?.(value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="rounded-md bg-primary/40 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle filter options"
      >
        <SlidersHorizontal className="text-primary" strokeWidth={2.75} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white p-1 shadow-md md:left-0"
          role="menu"
        >
          <FilterOption label="Đang Mở" selected={selected} onClick={() => handleChange(true)} />
          <div className="mx-2 my-1 h-[1px] bg-primary"></div>
          <FilterOption
            label="Đã Hết Hạn"
            selected={!selected}
            onClick={() => handleChange(false)}
          />
        </div>
      )}
    </div>
  )
}

const FilterOption = ({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) => (
  <div
    className="flex cursor-pointer items-center gap-2 p-2 hover:rounded-md hover:bg-gray-100"
    onClick={onClick}
    role="menuitem"
  >
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${selected ? 'border-primary' : 'border-gray-300'}`}
    >
      {selected && <div className="h-4 w-4 rounded-full bg-primary" />}
    </div>
    <span className="text-sm font-semibold text-primary">{label}</span>
  </div>
)

export default FilterSearch
