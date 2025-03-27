'use client'

import { Input } from '@heroui/react'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type InputPasswordProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  className?: string
  visible?: boolean
} & UseControllerProps<T>

const colors = ['bg-red-600', 'bg-orange-500', 'bg-yellow-400', 'bg-green-400', 'bg-green-600']

const validatePassword = (password: string) => {
  const conditions = [/[A-Z]/, /[a-z]/, /[0-9]/, /[#?!@$%^&*-]/, /.{8,}/]
  return conditions.filter(value => value.test(password)).length
}

export default function InputPassword<T extends FieldValues>({
  label = 'Mật khẩu',
  placeholder,
  visible = true,
  className = '',
  ...controllerProps
}: InputPasswordProps<T>) {
  const { field, fieldState } = useController(controllerProps)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="mb-2 text-sm font-semibold text-black">
          {label}
          <span className="px-1 text-red-500">*</span>
        </p>
      )}
      <div
        className={`relative ${className} rounded-lg border ${fieldState.error ? 'border-red-500' : 'border-transparent'}`}
      >
        <Input
          classNames={{
            input: [
              'bg-white',
              'text-[var(--color-primary)]',
              'focus:outline-none',
              'font-medium',
              'text-sm',
            ].join(' '),
          }}
          endContent={
            <button
              aria-label="Toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(prev => !prev)}
            >
              {isVisible ? (
                <AiOutlineEye size={20} className="text-gray-400" />
              ) : (
                <AiOutlineEyeInvisible size={20} className="text-gray-400" />
              )}
            </button>
          }
          labelPlacement="outside"
          placeholder={placeholder}
          type={isVisible ? 'text' : 'password'}
          radius="md"
          {...field}
        />
      </div>
      {visible && field.value && field.value.length > 0 && (
        <div className="mt-2 flex w-11/12 gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded transition-all ${index < validatePassword(field.value) ? colors[index] : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
      {fieldState.error && <p className="mt-3 text-xs text-red-500">{fieldState.error.message}</p>}
    </div>
  )
}
