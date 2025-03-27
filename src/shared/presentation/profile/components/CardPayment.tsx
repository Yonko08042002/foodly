'use client'
import { Button, Card, CardBody, Tooltip } from '@heroui/react'
import React from 'react'
import { useState } from 'react'
import PaymentMethodModal from '@/shared/presentation/profile/components/PaymentMethodModal'
import { Chip } from '@heroui/chip'
import { RiDeleteBinLine } from 'react-icons/ri'
import { PaymentSetting } from '@/shared/types/auth'
import { useUserMutation } from '@/shared/hooks/useAuth'
import { LABELS, MESSAGE_STATUS } from '@/shared/constant'

interface CardPayMethodProps {
  data?: PaymentSetting[]
}
export default function CardPayment({ data }: CardPayMethodProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const mutation = useUserMutation(
    MESSAGE_STATUS.DELETE_SUCCESS.replace('{property}', LABELS.PAYMENT_METHOD),
    () => {},
    () => {},
  )
  const handleDeletePaymentMethod = (index: number) => {
    const listPaymentMethod = data?.filter((_, i) => i !== index)
    mutation.mutate({ payment_setting: listPaymentMethod })
  }

  return (
    <div className="">
      <Card className="rounded-lg bg-white p-2 shadow-lg">
        <CardBody>
          <h3 className="text-md font-semibold text-gray-500">Cài Đặt Thanh Toán</h3>
          <div className="mt-2 flex flex-col gap-3">
            {data?.map((item, index) => (
              <div className="flex" key={index}>
                <Chip className="flex items-center gap-1">
                  {item.payment_method}:{' '}
                  <span className="inline-flex max-w-[100px] truncate">
                    <Tooltip content={item.account_number}>{item.account_number}</Tooltip>
                  </span>
                  |
                  <span className="inline-flex max-w-[100px] truncate">
                    <Tooltip content={item.account_name}>{item.account_name}</Tooltip>
                  </span>
                </Chip>
                <RiDeleteBinLine
                  size={25}
                  color="red"
                  onClick={() => handleDeletePaymentMethod(index)}
                />
              </div>
            ))}
          </div>
          <Button
            className="mt-3 h-7 w-2 bg-primary text-white"
            size="sm"
            onPress={() => setIsPaymentModalOpen(true)}
          >
            Thêm
          </Button>
          <PaymentMethodModal
            isOpen={isPaymentModalOpen}
            onOpenChange={setIsPaymentModalOpen}
            data={data}
          />
        </CardBody>
      </Card>
    </div>
  )
}
