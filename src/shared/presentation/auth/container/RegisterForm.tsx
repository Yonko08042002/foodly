'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchema } from '@/shared/helpers/schemas/authSchema'
import InputPassword from '@/shared/components/atoms/InputPassword'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@heroui/react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import apiClient from '@/shared/libs/axios'
import { CODE_STATUS, MESSAGE_STATUS, ROUTES } from '@/shared/constant'

export default function RegisterForm() {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true })
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    defaultValues: { password: '', confirm_password: '' },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: RegisterSchema) => {
    const isValid = await trigger()
    if (!isValid) return
    const response = await apiClient.post('/auth/sign-up', data)
    if (response.status === CODE_STATUS.CREATED) {
      reset()
      toast.success(MESSAGE_STATUS.REGISTER_SUCCESS)
      router.replace('/')
    }
  }

  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop: 'bg-primary/30 backdrop-opacity-95 backdrop-blur-xl',
        base: 'border-primary ',
      }}
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      isDismissable={false}
      disableAnimation
    >
      <ModalContent className="px-4 py-2">
        <form className="mx-0 md:mx-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalHeader className="md:bt-0 -mb-3 flex flex-col items-center gap-1 text-xl font-bold uppercase md:mt-1">
            Đăng ký
          </ModalHeader>
          <ModalBody>
            <p className="-mb-2 text-sm font-semibold text-black">
              Mã Tổ Chức<span className="px-1 text-red-500">*</span>
            </p>
            <Input
              defaultValue="GMODN"
              type="text"
              placeholder="Nhập mã tổ chức"
              className={`rounded-lg border ${errors.organization_code ? 'border-red-500' : 'border-transparent'}`}
              {...register('organization_code')}
            />
            {errors.organization_code && (
              <p className="text-xs text-red-500">{errors.organization_code.message}</p>
            )}

            <p className="-mb-2 text-xs font-semibold text-black">
              Email<span className="px-1 text-red-500">*</span>
            </p>
            <Input
              type="text"
              placeholder="Nhập email"
              {...register('email')}
              className={`rounded-lg border ${errors.email ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

            <InputPassword name="password" control={control} label="Mật khẩu" />

            <InputPassword name="confirm_password" control={control} label="Nhập lại mật khẩu" />

            <p className="-mb-2 text-sm font-semibold text-black">
              Tên hiển thị<span className="px-1 text-red-500">*</span>
            </p>
            <Input
              type="text"
              placeholder="Nhập tên hiển thị"
              {...register('display_name')}
              className={`rounded-lg border ${errors.display_name ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.display_name && (
              <p className="text-xs text-red-500">{errors.display_name.message}</p>
            )}

            <div className="mt-3 text-center text-xs">
              Bạn đã có tài khoản?{' '}
              <Link href={ROUTES.LOGIN} className="mx-1 text-xs text-primary underline">
                Đăng Nhập
              </Link>{' '}
              ngay bây giờ
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onClick={() => router.push('/')}>
              Đóng
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Xác nhận
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
