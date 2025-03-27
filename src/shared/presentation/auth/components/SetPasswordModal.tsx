import { useForm } from 'react-hook-form'
import InputPassword from '@/shared/components/atoms/InputPassword'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'
import { FormSetPassword, SetPasswordUser } from '@/shared/types/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { setPasswordSchema, SetPasswordSchema } from '@/shared/helpers/schemas/authSchema'
import { useMutation } from '@tanstack/react-query'
import { LABELS, MESSAGE_STATUS, ROUTES } from '@/shared/constant'
import { toast } from 'sonner'
import { setPasswordUser } from '@/shared/apis/auth'
import { useRouter } from 'next/navigation'

type SetPasswordProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  token: string
}

function SetPasswordModal({ isOpen, onOpenChange, token }: SetPasswordProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<SetPasswordSchema>({
    defaultValues: { new_password: '', confirm_password: '' },
    resolver: zodResolver(setPasswordSchema),
    mode: 'onBlur',
  })
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: setPasswordUser,
    onSuccess: () => {
      toast.success(MESSAGE_STATUS.UPDATED_SUCCESS.replace('{property}', LABELS.NEW_PASSWORD))
      onOpenChange(false)
      reset()
      router.push(ROUTES.LOGIN)
    },
    onError: () => {},
  })
  const onSubmit = async (formData: FormSetPassword) => {
    const data: SetPasswordUser = {
      new_password: formData.new_password,
      token,
    }
    mutation.mutate(data)
  }
  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop: 'bg-primary/30 backdrop-opacity-95 backdrop-blur-xl',
        base: 'border-primary ',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent className="px-5">
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col items-center gap-1 uppercase">
              Thiết Lập Mật Khẩu Mới
            </ModalHeader>

            <ModalBody className="-mt-2 mb-3">
              <InputPassword name="new_password" label="Mật khẩu Mới" control={control} />
              <InputPassword
                name="confirm_password"
                label="Nhập Lại Mật Khẩu Mới"
                control={control}
              />
            </ModalBody>

            <ModalFooter className="mb-4">
              <Button
                className="font-semibold text-gray-500"
                color="primary"
                variant="light"
                onPress={onClose}
              >
                Đóng
              </Button>
              <Button
                color="primary"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="font-semibold"
                type="submit"
              >
                Xác nhận
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SetPasswordModal
