'use client'
import { EMOJI_REGEX } from '@/shared/constant'
import { Input } from '@heroui/react'
import { BiSearchAlt } from 'react-icons/bi'

type InputSearchProps = {
  placeholder?: string
  className?: string
  color?: string
  name: string
  value?: string
  onChange?: (value: string) => void
}

function InputSearch({
  placeholder = 'Tìm kiếm',
  className = '',
  color,
  name,
  value,
  onChange,
}: InputSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(EMOJI_REGEX, '')
    onChange?.(value)
  }

  return (
    <div className={`${className}`}>
      <Input
        classNames={{
          input: ['placeholder: placeholder-primary'],
        }}
        placeholder={placeholder}
        labelPlacement="outside"
        startContent={
          <BiSearchAlt
            className={`pointer-events-none flex-shrink-0 text-2xl text-default-400 ${color}`}
          />
        }
        name={name}
        id={name}
        value={value}
        type="text"
        radius="full"
        maxLength={255}
        onChange={handleChange}
      />
    </div>
  )
}

export default InputSearch
