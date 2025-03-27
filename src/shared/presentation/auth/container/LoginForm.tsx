'use client'

import { InputPassword } from '@/shared/components/atoms'
import { MESSAGE_STATUS, ROUTES } from '@/shared/constant'
import { loginSchema, LoginSchema } from '@/shared/helpers/schemas/authSchema'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ForgotPasswordModal from '@/shared/presentation/auth/components/ForgotPasswordModal'
export default function LoginForm() {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [isForgotOpen, setIsForgotOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<LoginSchema>({
    defaultValues: { password: '' },
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })
  const router = useRouter()

  const onSubmit = async (data: LoginSchema) => {
    const signInResponse = await signIn('credentials', {
      email: data.email,
      password: data.password,
      organization_code: data.organization_code,
      redirect: false,
    })
    if (signInResponse?.error) {
      toast.error(`ddddd,${MESSAGE_STATUS.LOGIN_FAILED}: ${signInResponse.error}`)
    } else {
      toast.success(MESSAGE_STATUS.LOGIN_SUCCESS)
      // reset()
      router.push(callbackUrl)
    }
  }
  console.log('secret', process.env.NEXTAUTH_SECRET)
  console.log('secret', process.env.NEXTAUTH_URL)
  console.log('secret', process.env.APP_API_BASE_URL)


  return (
    <div>
      {' '}
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
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-0 md:mx-5">
            <ModalHeader className="md:bt-0 -mb-3 flex flex-col items-center gap-1 text-xl font-bold uppercase md:mt-1">
              Đăng nhập
            </ModalHeader>
            <ModalBody className="gap-3 md:gap-4">
              <p className="-mb-2 text-sm font-semibold text-black">
                Mã Tổ Chức<span className="px-1 text-red-500">*</span>
              </p>
              <Input defaultValue="GMODN" type="text" readOnly {...register('organization_code')} />
              <p className="-mb-2 text-sm font-semibold text-black" {...register('email')}>
                Email<span className="px-1 text-red-500">*</span>
              </p>
              <Input
                type="text"
                placeholder="Nhập email"
                className={`rounded-lg border ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              <InputPassword control={control} name="password" label="Mật Khẩu" />

              <p
                onClick={() => setIsForgotOpen(true)}
                className="mx-2 mt-2 flex hidden justify-end text-xs text-primary md:flex"
              >
                Quên mật khẩu?
              </p>

              <div className="mx-auto mt-3 flex w-full justify-center text-xs md:mt-0">
                Bạn không có tài khoản?{' '}
                <Link href={ROUTES.REGISTER} className="mx-1 text-xs text-primary underline">
                  Đăng Ký
                </Link>
                ngay bây giờ
              </div>
            </ModalBody>
            <ModalFooter className="mt-4 md:mt-0">
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
          <ForgotPasswordModal isOpen={isForgotOpen} onOpenChange={setIsForgotOpen} />
        </ModalContent>
      </Modal>
    </div>
  )
}
