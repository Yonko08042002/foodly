import { LABELS, MESSAGE_STATUS } from '@/shared/constant'
import { userSchema, UserSchema } from '@/shared/helpers/schemas/authSchema'
import { useUserMutation } from '@/shared/hooks/useAuth'
import { UpdateUserInfo } from '@/shared/types/auth'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type ChangeNameProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  data?: string
}
function ChangeNameModal({ isOpen, onOpenChange, data }: ChangeNameProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: 'onBlur',
  })

  const mutation = useUserMutation(
    MESSAGE_STATUS.UPDATED_SUCCESS.replace('{property}', LABELS.DISPLAY_NAME),
    reset,
    onOpenChange,
  )

  const onSubmit = async (formData: UpdateUserInfo) => {
    mutation.mutate({ display_name: formData.display_name })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
      <ModalContent className="px-5">
        {onClose => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col items-center gap-1 uppercase">
              Đổi tên hiển thị
            </ModalHeader>

            <ModalBody className="-mt-4 mb-5">
              <Divider />
              <li className="ml-2 mt-2 text-gray-500">
                <span className="-ml-1 block truncate text-sm" title={data}>
                  {data}
                </span>
              </li>

              <Input
                className={`rounded-lg border ${errors.display_name ? 'border-red-500' : 'border-transparent'}`}
                placeholder="Tên mới"
                type="text"
                {...register('display_name')}
              />
              {errors.display_name && (
                <p className="text-xs text-red-500">{errors.display_name.message}</p>
              )}
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
                color="primary"
                className="font-semibold"
                type="submit"
                isLoading={mutation.isPending}
                disabled={isSubmitting}
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

export default ChangeNameModal
