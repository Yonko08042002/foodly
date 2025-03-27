'use client'
import { resetPasswordUser } from '@/shared/apis/auth'
import { resetPasswordSchema } from '@/shared/helpers/schemas/authSchema'
import { ResetPasswordUser } from '@/shared/types/auth'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mailUrl, MESSAGE_CODE } from '@/shared/constant'

type ChangePasswordProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

function ForgotPasswordModal({ isOpen, onOpenChange }: ChangePasswordProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordUser>({ resolver: zodResolver(resetPasswordSchema), mode: 'onBlur' })

  const mutation = useMutation({
    mutationFn: resetPasswordUser,
    onSuccess: () => {
      toast.success(MESSAGE_CODE.MSG_024)
      reset()
      onOpenChange(false)
    },
  })

  const onSubmit = async (formData: ResetPasswordUser) => {
    mutation.mutate({
      ...formData,
      redirect_url: mailUrl,
    })
  }
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
        <ModalContent className="px-5">
          {onClose => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col items-center gap-1 uppercase">
                Quên mật khẩu ?
              </ModalHeader>
              <ModalBody className="-mt-2 mb-3">
                <p className="-mb-2 text-sm font-semibold text-black">
                  Mã Tổ Chức<span className="px-1 text-red-500">*</span>
                </p>
                <Input
                  className={`rounded-lg border font-semibold ${errors.organization_code ? 'border-red-500' : 'border-transparent'}`}
                  classNames={{
                    input: [
                      'bg-transparent',
                      'text-black/90 dark:text-white/90',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                  }}
                  {...register('organization_code')}
                />
                {errors.organization_code && (
                  <p className="text-xs text-red-500">{errors.organization_code.message}</p>
                )}
                <p className="-mb-2 text-sm font-semibold text-black">
                  Email<span className="px-1 text-red-500">*</span>
                </p>
                <Input
                  className={`rounded-lg border font-semibold ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                  type="text"
                  classNames={{
                    input: [
                      'bg-transparent',
                      'text-black/90 dark:text-white/90',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                  }}
                  {...register('email')}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </ModalBody>
              <ModalFooter className="mb-4">
                <Button
                  onPress={() => {
                    reset()
                    onClose()
                  }}
                  color="primary"
                  className="font-semibold text-gray-500"
                  variant="light"
                >
                  Đóng
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="font-semibold"
                  isLoading={mutation.isPending}
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ForgotPasswordModal
