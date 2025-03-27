import React from 'react'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
  Select,
  SelectItem,
} from '@heroui/react'
import { useForm } from 'react-hook-form'
import { paymentSchema, PaymentSchema } from '@/shared/helpers/schemas/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentSetting } from '@/shared/types/auth'
import { useUserMutation } from '@/shared/hooks/useAuth'
import { LABELS, MESSAGE_STATUS } from '@/shared/constant'
type PaymentMethodProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  data?: PaymentSetting[]
}
export const listMethod = [
  { key: 'vietcombank', label: 'Vietcombank' },
  { key: 'mbbank', label: 'MB Bank' },
  { key: 'cash', label: 'VIB' },
]

export default function PaymentMethodModal({ isOpen, onOpenChange, data }: PaymentMethodProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    mode: 'onBlur',
  })
  const mutation = useUserMutation(
    MESSAGE_STATUS.CREATE_SUCCESS.replace('{property}', LABELS.PAYMENT_METHOD),
    reset,
    onOpenChange,
  )
  const onSubmit = async (formData: PaymentSetting) => {
    mutation.mutate({ payment_setting: [...(data || []), formData] })
    reset()
  }

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
        <ModalContent className="px-5">
          {onClose => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col items-center gap-1 uppercase">
                Thêm PTTT
              </ModalHeader>

              <ModalBody className="-mt-4 mb-5">
                <Divider className="mb-2" />
                <p className="-mb-2 text-sm font-semibold text-gray-500">
                  Chủ TK<span className="px-1 text-red-500">*</span>
                </p>
                <Input
                  placeholder="Tên"
                  labelPlacement="outside"
                  className={`rounded-lg border font-semibold ${errors.account_name ? 'border-red-500' : 'border-transparent'}`}
                  classNames={{
                    input: [
                      'bg-transparent',
                      'text-black/90 dark:text-white/90',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                  }}
                  {...register('account_name')}
                />
                {errors.account_name && (
                  <p className="text-xs text-red-500">{errors.account_name.message}</p>
                )}
                <p className="-mb-2 text-sm font-semibold text-gray-500">
                  Số TK<span className="px-1 text-red-500">*</span>
                </p>
                <Input
                  placeholder="Tên"
                  labelPlacement="outside"
                  className={`rounded-lg border font-semibold ${errors.account_number ? 'border-red-500' : 'border-transparent'}`}
                  classNames={{
                    input: [
                      'bg-transparent',
                      'text-black/90 dark:text-white/90',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                  }}
                  {...register('account_number')}
                />
                {errors.account_number && (
                  <p className="text-xs text-red-500">{errors.account_number.message}</p>
                )}
                <p className="-mb-1 text-sm font-semibold text-gray-500">
                  Ngân Hàng<span className="px-1 text-red-500">*</span>
                </p>

                <Select
                  className={`rounded-lg border font-semibold ${errors.payment_method ? 'border-red-500' : 'border-transparent'}`}
                  {...register('payment_method')}
                  fullWidth
                >
                  {listMethod.map(method => (
                    <SelectItem key={method.key}>{method.label}</SelectItem>
                  ))}
                </Select>
                {errors.payment_method && (
                  <p className="text-xs text-red-500">{errors.payment_method.message}</p>
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
                  type="submit"
                  isLoading={mutation.isPending}
                  disabled={isSubmitting}
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
    </div>
  )
}
