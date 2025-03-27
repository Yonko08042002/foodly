import { updatePasswordUser } from '@/shared/apis/auth'
import { InputPassword } from '@/shared/components/atoms'
import { LABELS, MESSAGE_STATUS } from '@/shared/constant'
import { changePasswordSchema } from '@/shared/helpers/schemas/authSchema'
import { UpdatePassword } from '@/shared/types/auth'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
type ChangePasswordProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

function ChangePasswordModal({ isOpen, onOpenChange }: ChangePasswordProps) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<changePasswordSchema>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: '',
    },
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
  })
  const mutation = useMutation({
    mutationFn: updatePasswordUser,
    onSuccess: () => {
      toast.success(MESSAGE_STATUS.UPDATED_SUCCESS.replace('{property}', LABELS.PASSWORD))
      onOpenChange(false)
      reset()
    },
  })
  const onSubmit = async (formData: UpdatePassword) => {
    const data: UpdatePassword = {
      password: formData.password,
      new_password: formData.new_password,
    }
    mutation.mutate(data)
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
        <ModalContent className="px-5">
          {onClose => (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <ModalHeader className="flex flex-col items-center gap-1 uppercase">
                Đổi mật khẩu
              </ModalHeader>

              <ModalBody className="-mt-4 mb-5">
                <Divider className="mb-2" />

                <InputPassword
                  control={control}
                  placeholder="Nhập"
                  name="password"
                  label="Mật Khẩu"
                  visible={false}
                />

                <InputPassword
                  control={control}
                  placeholder="Nhập"
                  name="new_password"
                  label="Mật khẩu mới"
                  visible={false}
                />
                <InputPassword
                  control={control}
                  placeholder="Nhập"
                  name="confirm_password"
                  label="Xác nhận mật khẩu"
                  visible={false}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="font-semibold text-gray-500"
                  variant="light"
                  color="primary"
                  onPress={() => {
                    reset()
                    onClose()
                  }}
                >
                  Đóng
                </Button>
                <Button
                  isLoading={mutation.isPending}
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                  className="font-semibold"
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
